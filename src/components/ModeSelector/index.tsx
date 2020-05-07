import React from 'react'
import './modeSelector.css'

type Props = {
  onModeSelected: (url: string) => void
}
const ModeSelector: React.FC<Props> = ({onModeSelected}) => {
  const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
  const bigUrl = 'http://www.filltext.com/?rows=500&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

  return (
    <div className="mode-selector">
      <h5>Выберите объем загружаемых данных</h5>
      <button className="btn-small" onClick={() => onModeSelected(smallUrl)}>Маленький</button>
      <button className="btn-small red" onClick={() => onModeSelected(bigUrl)}>Большой</button>
    </div>
  );
}

export default ModeSelector;
