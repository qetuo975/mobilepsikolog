import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

declare var Peer: any;

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  MyPeerId: any;
  targetUser: any; // Store the target user
  peer: any;
  myVideoStream: any = null;
  clientVideoStreams: any[] = [];

  constructor(private socket: Socket, private router: Router) {
    this.peer = new Peer();
  }

  ngOnInit() {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    console.log(state);

    if (state && state.chatData && state.chatData.target) {
      this.targetUser = state.chatData.target;

      console.log('Target User:', this.targetUser);

      setTimeout(() => {
        this.openCamera();
        this.socket.connect();
        this.peer.on('open', (id: any) => {
          this.MyPeerId = id;
          console.log('Peer ID:', this.MyPeerId); // Peer ID'nin doğru şekilde alındığını kontrol edin
          this.socket.emit('set-name', {
            peerId: this.MyPeerId,
            targetId: this.targetUser.id,
          });
          console.log('Set-name emitted'); // Emit işleminin gerçekleştiğini kontrol edin
          this.socket.emit('set-camera', this.MyPeerId, true);
          this.socket.emit('list-client');
        });

        // İstemci Kodu
        this.socket.on('list-client', (data: any) => {
          let users = data.users;

          // Target kullanıcının bağlı olup olmadığını kontrol et
          let targetUserConnected = users.some(
            (user: any) => user.targetId === this.targetUser.id
          );

          if (targetUserConnected) {
            console.log('Hedef kullanıcı bağlı, medya çağrısı başlatılıyor...');
            this.mediaCall();
            this.mediaAnswer();
          } else {
            console.log('Hedef kullanıcı bağlı değil.');
          }
        });
      }, 1000);
    }
  }

  mediaAnswer() {
    const n = <any>navigator;
    const chatclass = this;
    this.peer.on('call', (call: any) => {
      n.getUserMedia =
        n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
      n.getUserMedia(
        { video: { width: 320, height: 320 }, audio: true },
        (stream: any) => {
          call.answer(stream);
          call.on('stream', (remoteStream: any) => {
            chatclass.clientVideoStreams.push(remoteStream);
            chatclass.addVideoStream(remoteStream, call.peer);
          });
        },
        (err: any) => {
          console.log('Failed to get local stream', err);
        }
      );
    });
  }

  openCamera() {
    const n = <any>navigator;
    n.getUserMedia =
      n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia(
      {
        video: { width: 1000, height: 320 },
        audio: true,
      },
      (stream: any) => {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');
        video.style.width = '100%';
        video.style.height = 'auto';
        var myList = document.getElementById('myList');
        if (myList) {
          myList.appendChild(video);
        }
        var myID = 'myVideo';
        video.setAttribute('id', myID);
        this.myVideoStream = stream;
      },
      (err: any) => {
        console.error('Failed to get local stream', err);
      }
    );
  }

  mediaCall() {
    var video = document.createElement('video');
    var locaVar = this.peer;
    var fname = this.targetUser.id;
    var n = <any>navigator;
    n.getUserMedia =
      n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia(
      { video: { width: 320, height: 320 }, audio: true },
      (stream: any) => {
        var call = locaVar.call(fname, stream);
        call.on('stream', (remoteStream: any) => {
          video.srcObject = remoteStream;
          video.play();
          video.setAttribute('autoplay', '');
          video.setAttribute('playsinline', '');
          video.style.width = '100%';
          video.style.height = 'auto';
          var myList = document.getElementById('myList');
          if (myList) {
            myList.appendChild(video);
          }
          let howmany: any =
            document.getElementById('myList')?.childElementCount;
          document
            .getElementsByTagName('video')
            [howmany - 1].setAttribute('id', fname);
        });
        call.on('close', () => {
          video.remove();
        });
      },
      (err: any) => {
        console.log('Failed to get local stream', err);
      }
    );
  }

  muteUnmute() {
    let audioEnabled = this.myVideoStream.getAudioTracks()[0].enabled;
    this.myVideoStream.getAudioTracks()[0].enabled = !audioEnabled;
    const muteButton = document.querySelector('.main__mute_button');
    if (audioEnabled) {
      muteButton!.innerHTML = '<span>Sesi Aç</span>';
    } else {
      muteButton!.innerHTML = '<span>Sesi Kapat</span>';
    }
  }

  playStop() {
    let videoEnabled = this.myVideoStream.getVideoTracks()[0].enabled;
    this.myVideoStream.getVideoTracks()[0].enabled = !videoEnabled;
    this.socket.emit(
      'set-camera',
      this.MyPeerId,
      this.myVideoStream.getVideoTracks()[0].enabled
    );
    for (let clientStream of this.clientVideoStreams) {
      clientStream.getVideoTracks()[0].enabled =
        !clientStream.getVideoTracks()[0].enabled;
    }
    const videoButton = document.querySelector('.main__video_button');
    if (videoEnabled) {
      videoButton!.innerHTML = '<span>Videoyu Aç</span>';
    } else {
      videoButton!.innerHTML = '<span>Videoyu Kapat</span>';
    }
  }

  addVideoStream(stream: any, id: any) {
    var video = document.createElement('video');
    video.srcObject = stream;
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.style.width = '100%';
    video.style.height = 'auto';
    var myList = document.getElementById('myList');
    if (myList) {
      myList.appendChild(video);
    }
    video.setAttribute('id', id);
  }
}
