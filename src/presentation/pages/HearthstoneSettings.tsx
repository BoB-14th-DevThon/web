import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import HearthstoneButton from '../components/ui/HearthstoneButton';
import HearthstonePanel from '../components/ui/HearthstonePanel';

interface SettingsPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translate(-50%, -40%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 80vh;
  animation: ${slideIn} 0.4s ease-out;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SettingsTitle = styled.h2`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 2.5rem;
  color: #ffd700;
  text-transform: uppercase;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.4);
  margin: 0;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #dc143c 0%, #8b0000 100%);
  border: 2px solid #ffd700;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(220, 20, 60, 0.6);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 10px 30px;
  background: ${(props) =>
    props.active
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      : 'linear-gradient(135deg, #3D241A 0%, #2C1810 100%)'};
  border: 2px solid ${(props) => (props.active ? '#FFD700' : '#8B6914')};
  border-radius: 8px 8px 0 0;
  color: ${(props) => (props.active ? '#1A1A1A' : '#FAF8F6')};
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: #ffd700;
  }
`;

const SettingsContent = styled.div`
  padding: 30px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b6914;
    border-radius: 5px;
  }
`;

const SettingGroup = styled.div`
  margin-bottom: 25px;
`;

const SettingLabel = styled.label`
  display: block;
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1.1rem;
  color: #ffd700;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  background: #3d241a;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ffd700 0%, #ffa500 100%);
    border: 2px solid #8b6914;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
    transition: all 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  }
`;

const SliderValue = styled.span`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.2rem;
  color: #faf8f6;
  margin-left: 15px;
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSwitch = styled.div<{ checked?: boolean }>`
  width: 60px;
  height: 30px;
  background: ${(props) =>
    props.checked
      ? 'linear-gradient(90deg, #32CD32 0%, #228B22 100%)'
      : 'linear-gradient(90deg, #696969 0%, #404040 100%)'};
  border: 2px solid ${(props) => (props.checked ? '#FFD700' : '#8B6914')};
  border-radius: 15px;
  position: relative;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(props) => (props.checked ? '28px' : '2px')};
    width: 22px;
    height: 22px;
    background: radial-gradient(circle, #ffffff 0%, #f0f0f0 100%);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
`;

const ToggleLabel = styled.span`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1rem;
  color: #faf8f6;
  margin-left: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  background: linear-gradient(135deg, #3d241a 0%, #2c1810 100%);
  border: 2px solid #8b6914;
  border-radius: 4px;
  color: #faf8f6;
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #ffd700;
  }

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
`;

const HearthstoneSettings: React.FC<SettingsPageProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('게임');
  const [volume, setVolume] = useState(70);
  const [musicVolume, setMusicVolume] = useState(50);
  const [effects, setEffects] = useState(true);
  const [language, setLanguage] = useState('ko');

  const handleSave = () => {
    // 설정 저장 로직
    onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <HearthstonePanel variant="wood" size="large">
          <SettingsHeader>
            <SettingsTitle>설정</SettingsTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </SettingsHeader>

          <TabContainer>
            <Tab active={activeTab === '게임'} onClick={() => setActiveTab('게임')}>
              게임
            </Tab>
            <Tab active={activeTab === '소리'} onClick={() => setActiveTab('소리')}>
              소리
            </Tab>
            <Tab active={activeTab === '그래픽'} onClick={() => setActiveTab('그래픽')}>
              그래픽
            </Tab>
          </TabContainer>

          <SettingsContent>
            {activeTab === '게임' && (
              <>
                <SettingGroup>
                  <SettingLabel>언어</SettingLabel>
                  <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                  </Select>
                </SettingGroup>

                <SettingGroup>
                  <Toggle>
                    <ToggleInput
                      type="checkbox"
                      checked={effects}
                      onChange={(e) => setEffects(e.target.checked)}
                    />
                    <ToggleSwitch checked={effects} />
                    <ToggleLabel>화면 효과</ToggleLabel>
                  </Toggle>
                </SettingGroup>
              </>
            )}

            {activeTab === '소리' && (
              <>
                <SettingGroup>
                  <SettingLabel>
                    전체 음량
                    <SliderValue>{volume}%</SliderValue>
                  </SettingLabel>
                  <Slider
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </SettingGroup>

                <SettingGroup>
                  <SettingLabel>
                    배경 음악
                    <SliderValue>{musicVolume}%</SliderValue>
                  </SettingLabel>
                  <Slider
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                  />
                </SettingGroup>
              </>
            )}

            {activeTab === '그래픽' && (
              <>
                <SettingGroup>
                  <SettingLabel>그래픽 품질</SettingLabel>
                  <Select>
                    <option value="low">낮음</option>
                    <option value="medium">중간</option>
                    <option value="high">높음</option>
                    <option value="ultra">최고</option>
                  </Select>
                </SettingGroup>
              </>
            )}
          </SettingsContent>

          <ButtonGroup>
            <HearthstoneButton size="medium" variant="confirm" onClick={handleSave}>
              저장
            </HearthstoneButton>
            <HearthstoneButton size="medium" variant="cancel" onClick={onClose}>
              취소
            </HearthstoneButton>
          </ButtonGroup>
        </HearthstonePanel>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HearthstoneSettings;
