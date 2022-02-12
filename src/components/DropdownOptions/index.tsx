import { useState } from 'react';
import DropCSS from './DropdownOptions.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function DropdownOptions(props: any): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOptions = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    props.setSelectedOption(option);

    toggleOptions();
  };

  return (
    <div className={DropCSS.container}>
      <div className={DropCSS.header} onClick={toggleOptions}>
        {props.selectedOption ? props.selectedOption : props.defaultText}{' '}
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      {isOpen && (
        <div className={props.fixedHeight ? DropCSS.fixedBody : DropCSS.body}>
          {props.OPTIONS.map((option: string, index: any) => (
            <div
              key={index}
              className={DropCSS.item}
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownOptions;
