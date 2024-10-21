'use client';

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Audio,
  Sequence,
} from 'remotion';
import type { WouldYouRatherScene } from '@/types/WouldYouRatherScene'; // Use type-only import
import { generateSpeech } from '../../lib/elevanlabs';
import { useCallback, useEffect, useState } from 'react';
import { random } from 'remotion';

interface Props {
  durationInSeconds: number;
  scenes: WouldYouRatherScene[];
  voiceId: string;
}

const WouldYouRatherScene: React.FC<{
  topImage: string;
  bottomImage: string;
  topText: string;
  bottomText: string;
  topPercentage: string;
  bottomPercentage: string;
}> = ({
  topImage,
  bottomImage,
  topText,
  bottomText,
  topPercentage,
  bottomPercentage,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topEntrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const bottomEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15 },
  });

  const topTransform = interpolate(topEntrance, [0, 1], [-100, 0]);
  const bottomTransform = interpolate(bottomEntrance, [0, 1], [100, 0]);

  const percentageOpacity = spring({
    frame: frame - 4 * fps,
    fps,
    config: { damping: 10 },
  });

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    overflow: 'hidden',
  };

  const imageContainerStyle: React.CSSProperties = {
    width: '300px',
    height: '300px',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const textStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '36px',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  const percentageStyle: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: 'bold',
    opacity: percentageOpacity,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  };

  const topPercentageNum = parseInt(topPercentage);
  const bottomPercentageNum = parseInt(bottomPercentage);

  const highlightTop = topPercentageNum > bottomPercentageNum;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{...containerStyle, backgroundColor: '#FF0000'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transform: `translateX(${topTransform}%)`,
        }}>
          <div style={imageContainerStyle}>
            <img src={topImage} style={imageStyle} alt={topText} />
          </div>
          <h2 style={textStyle}>{topText}</h2>
          <h3 style={{
            ...percentageStyle, 
            color: highlightTop ? '#FFFF00' : 'white'
          }}>{topPercentage}</h3>
        </div>
      </div>
      
      <div style={{...containerStyle, backgroundColor: '#0000FF'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transform: `translateX(${bottomTransform}%)`,
        }}>
          <h3 style={{
            ...percentageStyle, 
            color: !highlightTop ? '#FFFF00' : 'white'
          }}>{bottomPercentage}</h3>
          <h2 style={textStyle}>{bottomText}</h2>
          <div style={imageContainerStyle}>
            <img src={bottomImage} style={imageStyle} alt={bottomText} />
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '100px',
        backgroundColor: 'black',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '6px solid white',
        zIndex: 10,
        boxShadow: '0 0 20px rgba(255,255,255,0.5)',
      }}>
        <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>OR</span>
      </div>

      <Sequence from={4 * fps}>
        <Audio src="/ting.mp3" />
      </Sequence>
    </AbsoluteFill>
  );
};

export const WouldYouRather: React.FC<Props> = ({ durationInSeconds, scenes, voiceId }) => {
  const { fps } = useVideoConfig();
  const totalFrames = durationInSeconds * fps;
  const sceneDuration = Math.floor(totalFrames / scenes.length);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const generateAudio = useCallback(async () => {
    const urls = await Promise.all(
      scenes.map(async (scene) => {
        const topAudio = await generateSpeech(scene.topText, voiceId);
        const bottomAudio = await generateSpeech(scene.bottomText, voiceId);
        return [topAudio, bottomAudio];
      })
    );
    setAudioUrls(urls.flat());
  }, [scenes, voiceId]);

  useEffect(() => {
    generateAudio();
  }, [generateAudio]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#1E3A8A' }}>
      {scenes.map((scene, index) => (
        <Sequence
          from={index * sceneDuration}
          durationInFrames={sceneDuration}
          key={index}
        >
          <WouldYouRatherScene
            topImage={scene.topImageUrl || ''}
            bottomImage={scene.bottomImageUrl || ''}
            topText={scene.topText}
            bottomText={scene.bottomText}
            topPercentage={scene.topPercentage.toString()}
            bottomPercentage={scene.bottomPercentage.toString()}
          />
          {audioUrls[index * 2] && (
            <Audio
              src={audioUrls[index * 2]}
              startFrom={0}
              endAt={sceneDuration / 2}
            />
          )}
          {audioUrls[index * 2 + 1] && (
            <Audio
              src={audioUrls[index * 2 + 1]}
              startFrom={sceneDuration / 2}
              endAt={sceneDuration}
            />
          )}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const TestWouldYouRather: React.FC = () => {
  const testScenes: WouldYouRatherScene[] = [
    {
      topText: "Live in the mountains",
      bottomText: "Live by the beach",
      topImageUrl: `https://source.unsplash.com/random/800x600?mountains&sig=${random(1000)}`,
      bottomImageUrl: `https://source.unsplash.com/random/800x600?beach&sig=${random(1000)}`,
      topPercentage: 45,
      bottomPercentage: 55,
    },
    {
      topText: "Be a famous actor",
      bottomText: "Be a successful entrepreneur",
      topImageUrl: `https://source.unsplash.com/random/800x600?actor&sig=${random(1000)}`,
      bottomImageUrl: `https://source.unsplash.com/random/800x600?entrepreneur&sig=${random(1000)}`,
      topPercentage: 30,
      bottomPercentage: 70,
    },
  ];

  return (
    <WouldYouRather
      durationInSeconds={20}
      scenes={testScenes}
      voiceId="your_voice_id_here"
    />
  );
};