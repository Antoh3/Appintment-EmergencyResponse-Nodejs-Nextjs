"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { FaPhoneSlash, FaPhoneAlt, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // Ensure polling fallback
});

export default function VideoCall() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [me, setMe] = useState<string>("");
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState<boolean>(false);
  const [callEnded, setCallEnded] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [calling, setCalling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    socket.on("me", (id: string) => {
      console.log("Your User ID:", id);
      setMe(id);
    });

    socket.on("incomingCall", ({ from, signal }: { from: string; signal: any }) => {
      setCall({ isReceivingCall: true, from, signal });
    });

    socket.on("callEnded", () => {
      handleCallEnded();
    });

    return () => {
      socket.off("me");
      socket.off("incomingCall");
      socket.off("callEnded");
    };
  }, []);

  const getMediaStream = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;
      setError(null); // Clear any previous errors
      return currentStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError("Failed to access camera or microphone. Please check permissions and try again.");
      return null;
    }
  };

  const callUser = async (id: string) => {
    if (!id || id === me) {
      alert("Enter a valid User ID (not your own).");
      return;
    }
    setCalling(true);

    const currentStream = await getMediaStream();
    if (!currentStream) {
      setCalling(false);
      return;
    }

    const peer = new Peer({ initiator: true, trickle: false, stream: currentStream });

    peer.on("signal", (data: any) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: me });
    });

    peer.on("stream", (userStream: MediaProvider | null) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = async () => {
    setCallAccepted(true);

    const currentStream = await getMediaStream();
    if (!currentStream) return;

    const peer = new Peer({ initiator: false, trickle: false, stream: currentStream });

    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (userStream: MediaProvider | null) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const declineCall = () => {
    socket.emit("declineCall", { to: call.from });
    setCall({});
  };

  const handleCallEnded = () => {
    setCallEnded(true);
    setCalling(false);
    setCallAccepted(false);
    setCall({});
    connectionRef.current?.destroy();
    if (stream) stream.getTracks().forEach((track) => track.stop());
  };

  const leaveCall = () => {
    socket.emit("callEnded", { to: call.from });
    handleCallEnded();
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
      setMute(!mute);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Video Call</h1>

     
        {error && (
            <div className="bg-red-500 p-4 rounded-md mb-4">
              <p>{error}</p>
            </div>
          )}
   

      {!calling && !callAccepted ? (
        <div className="bg-gray-800 p-6 rounded-md text-center">
          <h2 className="text-xl mb-4">Make a Video Call</h2>
          <button
            className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-700"
            onClick={() => callUser(prompt("Enter user ID to call:") || "")}
          >
            Start Call
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-md w-[50%] flex items-center justify-center">
          {callAccepted && !callEnded ? (
            <video ref={userVideo} className="w-full rounded-md" autoPlay playsInline />
          ) : (
            <video ref={myVideo} className="w-full rounded-md" autoPlay playsInline />
          )}
        </div>
      )}

      {calling || callAccepted ? (
        <div className="mt-4 flex gap-4">
          <button className="bg-red-500 p-3 rounded-full hover:bg-red-700" onClick={leaveCall}>
            <FaPhoneSlash size={20} />
          </button>
          <button
            className={`p-3 rounded-full ${mute ? "bg-gray-500" : "bg-blue-500"} hover:bg-blue-700`}
            onClick={toggleMute}
          >
            {mute ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
          </button>
        </div>
      ) : null}

      {call.isReceivingCall && !callAccepted && (
        <div className="top-0 mt-4 bg-gray-800 p-4 rounded-md text-center">
          <h2 className="text-xl">Incoming Call...</h2>
          <div className="flex gap-4 justify-center mt-2">
            <button className="bg-green-500 p-3 rounded-full hover:bg-green-700" onClick={answerCall}>
              Accept
            </button>
            <button className="bg-red-500 p-3 rounded-full hover:bg-red-700" onClick={declineCall}>
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}