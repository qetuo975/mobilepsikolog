import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';



import Peer from 'peerjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
})
export class ChatPage implements OnInit {
  peer!: Peer;
  localStream!: MediaStream;
  targetPeerId!: string; // Hedef kullanıcının PeerJS ID'si
  isCallStarted: boolean = false; // Görüşme başlatıldı mı?
  id: any;

  targetid: any;
  type: any;

  // Kamera ve mikrofon kontrol durumları
  isMicEnabled: boolean = true;
  isCamEnabled: boolean = true;
  currentCall: any; // Aktif aramayı saklamak için

  constructor(private router: Router, private http: HttpClient) {}

  async checkCameraPermission() {
    const permissionStatus = await Camera.checkPermissions();

    if (permissionStatus.camera !== 'granted') {
      // Request permission if not granted
      const requestStatus = await Camera.requestPermissions();
      console.log('Permission requested:', requestStatus);
    } else {
      console.log('Camera permission is already granted');
    }
  }

  ngOnInit() {
    this.checkCameraPermission();

    const state: any = this.router.getCurrentNavigation()?.extras.state;
    this.targetid = state.chatData.target.target.id;
    this.type = state.chatData.target.type;

    console.log(this.type, this.targetid);

    this.id = Number(localStorage.getItem('id'));
    this.peer = new Peer();

    // PeerJS ID'si alındığında backend'e kaydetme
    this.peer.on('open', (peerId) => {
      console.log('PeerJS ID:', peerId);

      // PeerJS ID'sini backend'e kaydet
      this.registerPeerId(this.id, peerId).subscribe({
        next: (res: any) => {
          console.log('Peer ID başarıyla kaydedildi.', res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    });

    // Gelen aramaları kabul etme
    this.peer.on('call', (call) => {
      this.currentCall = call; // Aktif aramayı sakla
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.localStream = stream;
          this.displayLocalStream();
          call.answer(stream); // Aramayı kabul et
          call.on('stream', (remoteStream) => {
            this.playRemoteStream(remoteStream); // Karşı tarafın videosunu oynat
          });
        })
        .catch((err) => {
          console.error('Media Error:', err);
        });
    });
  }

  // Kendi videosunu oynatma
  displayLocalStream() {
    const localVideoElement = document.querySelector(
      '#local-video'
    ) as HTMLVideoElement | null;
    if (localVideoElement) {
      localVideoElement.srcObject = this.localStream;
      localVideoElement.play();
    }
  }

  // Görüşmeyi sonlandır
  endCall() {
    if (this.currentCall) {
      this.currentCall.close(); // PeerJS bağlantısını sonlandır
    }

    // Eğer bir medya akışı varsa onu durdur
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }

    // Anasayfaya yönlendir
    this.router.navigate(['/tabs/anasayfa']);
  }

  // Backend'e PeerJS ID kaydetme
  registerPeerId(userId: string | number, peerId: string) {
    return this.http
      .post('http://bahrikement.com:9000/register', {
        userId: userId,
        peerId: peerId,
      })
      .pipe()
  }

  // Başka bir kullanıcının PeerJS ID'sini almak için
  getPeerId(targetUserId: string | number): Observable<any> {
    return this.http.get(`http://bahrikement.com:9000/peer-id/${targetUserId}`).pipe();
  }

  // Görüntülü arama başlatma
  startVideoCall() {
    // Kullanıcı tipi kontrolü (user/psikolog)
    if (this.type === 'Psikolog') {
      console.log('Psikolog ile görüşme başlatılıyor.');
    } else if (this.type === 'User') {
      console.log('Kullanıcı ile görüşme başlatılıyor.');
    } else {
      console.error('Bilinmeyen kullanıcı tipi:', this.type);
      return;
    }

    this.getPeerId(this.targetid).subscribe({
      next: (res: any) => {
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.localStream = stream;
          this.displayLocalStream(); // Kendi videonu ekrana getir
          const call = this.peer.call(res.peerId, stream); // Hedef PeerJS ID'ye arama yap
          this.isCallStarted = true; // Görüşme başlatıldı, butonu gizle

          call.on('stream', (remoteStream) => {
            this.playRemoteStream(remoteStream); // Karşı tarafın videosunu ekrana getir
          });
        })
        .catch((err) => {
          console.error('Media Error:', err);
        });
      },
      error: (err: any) => {
        console.error('PeerJS ID alınamadı:', err);
      }
    })
  }

  // Mikrofonu aç/kapat
  toggleMicrophone() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      this.isMicEnabled = !this.isMicEnabled;
      console.log(`Mikrofon ${this.isMicEnabled ? 'açık' : 'kapalı'}.`);
    }
  }

  // Kamerayı aç/kapat
  toggleCamera() {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      this.isCamEnabled = !this.isCamEnabled;
      console.log(`Kamera ${this.isCamEnabled ? 'açık' : 'kapalı'}.`);
    }
  }

  // Gelen stream'i video elementinde oynatma
  playRemoteStream(remoteStream: MediaStream) {
    const remoteVideoElement = document.querySelector(
      '#remote-video'
    ) as HTMLVideoElement | null;
    if (remoteVideoElement) {
      remoteVideoElement.srcObject = remoteStream;
      remoteVideoElement.play();
    } else {
      console.error('Remote video element not found!');
    }
  }
}
