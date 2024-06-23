import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';

declare var Peer: any;
var peer = new Peer();

var myVideoStream: any = null;
var clientVideoStreams: any[] = [];

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  MyPeerId: any;
  clientHasCall: any = [];
  clientCamera: any;
  anotherId: any;
  roomId: any;

  constructor(private socket: Socket, private toastCtrl: ToastController) {}

  ngOnInit() {
    setTimeout(() => {
      this.openCamera();
      this.socket.connect();
      this.MyPeerId = peer.id;
      this.clientHasCall.push(peer.id);
      this.socket.emit('set-name', this.MyPeerId);
      this.socket.fromEvent('users-changed').subscribe((data: any) => {
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('Kullanıcı Ayrıldı ' + user);
          document.getElementById(user)!.remove();
        } else {
          this.showToast('Kullanıcı Katıldı ' + user);
        }
      });
      this.socket.emit('set-camera', this.MyPeerId, true);
      this.socket.emit('list-client');
    }, 1000);
    this.socket.emit('request-camera');
    this.socket.fromEvent('request-camera').subscribe((data: any) => {
      this.clientCamera = data['user'];
    });
    this.socket.fromEvent('list-client').subscribe((data: any) => {
      let client_available = data['user'];
      for (var i = 0; i < this.clientHasCall.length; i++) {
        for (var k = 0; k < client_available.length; k++) {
          if (client_available[k] == this.clientHasCall[i]) {
            client_available.splice(k, 1);
            i--;
          }
        }
      }
      if (client_available.length == 0) {
      } else {
        for (var i = 0; i < client_available.length; i++) {
          this.clientHasCall.push(client_available[i]);
        }
        for (var i = 0; i < client_available.length; i++) {
          this.anotherId = client_available[i];
          this.mediaCall();
          this.mediaAnswer();
        }
      }
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
        myVideoStream = stream;
      },
      (err: any) => {
        console.error('Video kaynağı alınamadı: ', err);
      }
    );
  }

  mediaAnswer() {
    const n = <any>navigator;
    const chatclass = this;
    peer.on('call', (call: any) => {
      n.getUserMedia =
        n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
      n.getUserMedia(
        { video: { width: 320, height: 320 }, audio: true },
        (stream: any) => {
          call.answer(stream);
          call.on('stream', (remoteStream: any) => {
            clientVideoStreams.push(stream);
            stream.getVideoTracks()[0].enabled = !chatclass.clientCamera;
            if (stream.getVideoTracks()[0].enabled == true) {
            } else {
              stream.getVideoTracks()[0].enabled = chatclass.clientCamera
                ? myVideoStream.getVideoTracks()[0].enabled
                : !chatclass.clientCamera;
            }
          });
        },
        (err: any) => {
          console.log('Failed to get local stream', err);
        }
      );
    });
  }

  mediaCall() {
    var video = document.createElement('video');
    var locaVar = peer;
    var fname = this.anotherId;
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
    let audioEnabled = myVideoStream.getAudioTracks()[0].enabled;
    myVideoStream.getAudioTracks()[0].enabled = !audioEnabled;
    const muteButton = document.querySelector('.main__mute_button');
    if (audioEnabled) {
      muteButton!.innerHTML = '<span>Sesi Aç</span>';
    } else {
      muteButton!.innerHTML = '<span>Sesi Kapat</span>';
    }
  }

  playStop() {
    let videoEnabled = myVideoStream.getVideoTracks()[0].enabled;
    myVideoStream.getVideoTracks()[0].enabled = !videoEnabled;
    this.socket.emit(
      'set-camera',
      this.MyPeerId,
      myVideoStream.getVideoTracks()[0].enabled
    );
    for (let clientStream of clientVideoStreams) {
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

  async showToast(msg: any) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }
}
