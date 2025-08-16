import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { hearthstoneTheme } from '../../shared/theme/hearthstone';
import { Modal, ModalFooter } from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  min-height: 500px;
`;

const SettingsTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SettingsTab = styled.button<{ isActive?: boolean }>`
  padding: 12px 16px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      : hearthstoneTheme.textures.wood};
  border: 2px solid ${({ isActive }) => (isActive ? '#FFD700' : 'transparent')};
  border-radius: 8px;
  color: ${({ isActive }) => (isActive ? '#1A1A1A' : '#FAF8F6')};
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;

  &:hover:not(:disabled) {
    transform: translateX(4px);
    border-color: #ffd700;
    filter: brightness(1.1);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
      transform: translateX(4px);
    `}
`;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const SettingLabel = styled.label`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1rem;
  color: #faf8f6;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SettingDescription = styled.span`
  font-size: 0.85rem;
  color: #999;
  display: block;
  margin-top: 4px;
`;

const Slider = styled.input`
  width: 200px;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ffd700 0%,
    #ffd700 var(--value),
    #333 var(--value),
    #333 100%
  );
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffd700 0%, #ffa500 100%);
    border: 2px solid #1a1a1a;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${hearthstoneTheme.textures.stone};
    border: 2px solid #333;
    border-radius: 15px;
    transition: all 0.3s;

    &::before {
      position: absolute;
      content: '';
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 2px;
      background: radial-gradient(circle, #999 0%, #666 100%);
      border-radius: 50%;
      transition: all 0.3s;
    }
  }

  input:checked + span {
    background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
    border-color: #ffd700;

    &::before {
      transform: translateX(28px);
      background: radial-gradient(circle, #ffffff 0%, #ffd700 100%);
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
    }
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  background: ${hearthstoneTheme.textures.wood};
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 6px;
  color: #faf8f6;
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 150px;

  &:hover {
    border-color: #ffd700;
  }

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }

  option {
    background: #1a1a1a;
    color: #faf8f6;
  }
`;

const KeybindButton = styled.button`
  padding: 8px 16px;
  background: ${hearthstoneTheme.textures.metal};
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 6px;
  color: #1a1a1a;
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 100px;

  &:hover {
    border-color: #ffd700;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SettingsPage: React.FC<SettingsPageProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('gameplay');
  const [settings, setSettings] = useState({
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 90,
    voiceVolume: 100,
    fullscreen: false,
    vsync: true,
    antialiasing: true,
    shadows: 'high',
    textureQuality: 'ultra',
    resolution: '1920x1080',
    showFPS: false,
    autoEndTurn: false,
    smartTargeting: true,
    showCardHistory: true,
    language: 'english',
  });

  const handleSliderChange = (key: string, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleToggleChange = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const tabs = [
    { id: 'gameplay', label: 'Gameplay', icon: '🎮' },
    { id: 'graphics', label: 'Graphics', icon: '🖼️' },
    { id: 'audio', label: 'Audio', icon: '🔊' },
    { id: 'controls', label: 'Controls', icon: '⌨️' },
    { id: 'account', label: 'Account', icon: '👤' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'gameplay':
        return (
          <SettingGroup>
            <Panel variant="parchment" size="compact" bordered>
              <h3 style={{ color: '#8B4513', marginBottom: '16px' }}>Game Settings</h3>
              <SettingRow>
                <SettingLabel>
                  Auto End Turn
                  <SettingDescription>
                    Automatically end turn when no actions available
                  </SettingDescription>
                </SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.autoEndTurn}
                    onChange={() => handleToggleChange('autoEndTurn')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
              <SettingRow>
                <SettingLabel>
                  Smart Targeting
                  <SettingDescription>Highlight valid targets for cards</SettingDescription>
                </SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.smartTargeting}
                    onChange={() => handleToggleChange('smartTargeting')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
              <SettingRow>
                <SettingLabel>
                  Show Card History
                  <SettingDescription>Display recently played cards</SettingDescription>
                </SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.showCardHistory}
                    onChange={() => handleToggleChange('showCardHistory')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Language</SettingLabel>
                <Select
                  value={settings.language}
                  onChange={(e) => handleSelectChange('language', e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="korean">한국어</option>
                  <option value="japanese">日本語</option>
                  <option value="chinese">中文</option>
                </Select>
              </SettingRow>
            </Panel>
          </SettingGroup>
        );

      case 'graphics':
        return (
          <SettingGroup>
            <Panel variant="metal" size="compact" bordered>
              <h3 style={{ color: '#1A1A1A', marginBottom: '16px' }}>Display Settings</h3>
              <SettingRow>
                <SettingLabel>Resolution</SettingLabel>
                <Select
                  value={settings.resolution}
                  onChange={(e) => handleSelectChange('resolution', e.target.value)}
                >
                  <option value="1920x1080">1920x1080</option>
                  <option value="2560x1440">2560x1440</option>
                  <option value="3840x2160">3840x2160</option>
                  <option value="1366x768">1366x768</option>
                </Select>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Fullscreen</SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.fullscreen}
                    onChange={() => handleToggleChange('fullscreen')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
              <SettingRow>
                <SettingLabel>V-Sync</SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.vsync}
                    onChange={() => handleToggleChange('vsync')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Texture Quality</SettingLabel>
                <Select
                  value={settings.textureQuality}
                  onChange={(e) => handleSelectChange('textureQuality', e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </Select>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Shadow Quality</SettingLabel>
                <Select
                  value={settings.shadows}
                  onChange={(e) => handleSelectChange('shadows', e.target.value)}
                >
                  <option value="off">Off</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Show FPS Counter</SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={settings.showFPS}
                    onChange={() => handleToggleChange('showFPS')}
                  />
                  <span />
                </Toggle>
              </SettingRow>
            </Panel>
          </SettingGroup>
        );

      case 'audio':
        return (
          <SettingGroup>
            <Panel variant="wood" size="compact" bordered>
              <h3 style={{ color: '#FAF8F6', marginBottom: '16px' }}>Audio Settings</h3>
              <SettingRow>
                <SettingLabel>Master Volume</SettingLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={settings.masterVolume}
                  onChange={(e) => handleSliderChange('masterVolume', parseInt(e.target.value))}
                  style={{ '--value': `${settings.masterVolume}%` } as React.CSSProperties}
                />
              </SettingRow>
              <SettingRow>
                <SettingLabel>Music Volume</SettingLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={settings.musicVolume}
                  onChange={(e) => handleSliderChange('musicVolume', parseInt(e.target.value))}
                  style={{ '--value': `${settings.musicVolume}%` } as React.CSSProperties}
                />
              </SettingRow>
              <SettingRow>
                <SettingLabel>Sound Effects</SettingLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={settings.sfxVolume}
                  onChange={(e) => handleSliderChange('sfxVolume', parseInt(e.target.value))}
                  style={{ '--value': `${settings.sfxVolume}%` } as React.CSSProperties}
                />
              </SettingRow>
              <SettingRow>
                <SettingLabel>Voice Volume</SettingLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={settings.voiceVolume}
                  onChange={(e) => handleSliderChange('voiceVolume', parseInt(e.target.value))}
                  style={{ '--value': `${settings.voiceVolume}%` } as React.CSSProperties}
                />
              </SettingRow>
            </Panel>
          </SettingGroup>
        );

      case 'controls':
        return (
          <SettingGroup>
            <Panel variant="stone" size="compact" bordered>
              <h3 style={{ color: '#FAF8F6', marginBottom: '16px' }}>Keybindings</h3>
              <SettingRow>
                <SettingLabel>End Turn</SettingLabel>
                <KeybindButton>Space</KeybindButton>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Cancel Action</SettingLabel>
                <KeybindButton>ESC</KeybindButton>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Open Collection</SettingLabel>
                <KeybindButton>C</KeybindButton>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Toggle Fullscreen</SettingLabel>
                <KeybindButton>F11</KeybindButton>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Quick Chat</SettingLabel>
                <KeybindButton>Enter</KeybindButton>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Emote Menu</SettingLabel>
                <KeybindButton>E</KeybindButton>
              </SettingRow>
            </Panel>
          </SettingGroup>
        );

      case 'account':
        return (
          <SettingGroup>
            <Panel variant="magical" size="compact" bordered glowing>
              <h3 style={{ color: '#FFD700', marginBottom: '16px' }}>Account Information</h3>
              <SettingRow>
                <SettingLabel>Player ID</SettingLabel>
                <span style={{ color: '#FFD700' }}>Player#1234</span>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Region</SettingLabel>
                <Select>
                  <option value="na">North America</option>
                  <option value="eu">Europe</option>
                  <option value="asia">Asia</option>
                </Select>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Account Level</SettingLabel>
                <span style={{ color: '#FFD700' }}>Level 45</span>
              </SettingRow>
              <SettingRow>
                <SettingLabel>Total Wins</SettingLabel>
                <span style={{ color: '#FFD700' }}>342</span>
              </SettingRow>
            </Panel>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Button variant="danger" size="medium">
                Sign Out
              </Button>
              <Button variant="secondary" size="medium">
                Link Account
              </Button>
            </div>
          </SettingGroup>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="large">
      <SettingsGrid>
        <SettingsTabs>
          {tabs.map((tab) => (
            <SettingsTab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </SettingsTab>
          ))}
        </SettingsTabs>
        <SettingsContent>{renderContent()}</SettingsContent>
      </SettingsGrid>
      <ModalFooter>
        <Button variant="primary" size="medium" onClick={onClose}>
          Save Settings
        </Button>
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SettingsPage;
