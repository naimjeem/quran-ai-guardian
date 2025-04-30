
import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RecordingButtonProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      });
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      toast.info('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Failed to access microphone. Please check permissions.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      toast.info('Recording stopped');
    }
  }, [mediaRecorder, isRecording]);

  useEffect(() => {
    if (audioChunks.length > 0 && !isRecording) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      onRecordingComplete(audioBlob);
      setAudioChunks([]);
    }
  }, [audioChunks, isRecording, onRecordingComplete]);

  return (
    <div className="flex flex-col items-center">
      {isRecording ? (
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-ring opacity-75"></div>
          <div className="relative bg-red-600 text-white p-4 rounded-full z-10">
            <Mic className="h-8 w-8" />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className={`${isProcessing ? 'bg-gray-400' : 'bg-tarteel-primary'} text-white p-4 rounded-full`}>
            <Mic className="h-8 w-8" />
          </div>
        </div>
      )}
      
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        size="lg"
        className={`${
          isRecording 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-tarteel-primary hover:bg-tarteel-dark'
        } text-white font-medium px-6`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : isRecording ? (
          <>
            <Square className="h-4 w-4 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            Start Recording
          </>
        )}
      </Button>
    </div>
  );
};

export default RecordingButton;
