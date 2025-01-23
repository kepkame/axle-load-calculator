import React, { useState } from 'react';
import { PageHeader } from '@components/ui/PageHeader';
import { IconButton } from '@components/ui/Button/IconButtons/IconButton';
import { Button } from '@components/ui/Button/Button';
import SVGIcon from '@assets/icons/file_document.svg?react';
import SVGIconRemove from '@assets/icons/remove.svg?react';
import SVGIconChevron from '@assets/icons/chevron-down.svg?react';

const Step1Page: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleOnClick = () => {
    console.log('count:', count);
    setCount(count + 1);
  };

  return (
    <>
      <PageHeader title="Калькулятор нагрузки на ось грузового автомобиля" />
      <h1>{count}</h1>

      <div>
        <IconButton icon={SVGIcon} onClick={handleOnClick} ariaLabel="My TeSt" />
        <IconButton
          isRemove={true}
          icon={SVGIconRemove}
          onClick={handleOnClick}
          ariaLabel="My TeSt"
        />
      </div>

      <br />
      <hr />
      <hr />
      <hr />
      <br />

      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button onClick={handleOnClick} icon={SVGIcon}></Button>
          <Button onClick={handleOnClick}>Кнопка 1</Button>
          <Button icon={SVGIcon} onClick={handleOnClick}>
            Кнопка 2
          </Button>
          <Button icon={SVGIconChevron} onClick={handleOnClick}>
            Кнопка 3
          </Button>
          <Button icon={SVGIconChevron} iconPositionRight={true} onClick={handleOnClick}>
            Кнопка 4
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button isOutline={true} icon={SVGIcon} onClick={handleOnClick}></Button>
          <Button isOutline={true} onClick={handleOnClick}>
            Кнопка 1
          </Button>
          <Button isOutline={true} icon={SVGIcon} onClick={handleOnClick}>
            Кнопка 2
          </Button>
          <Button isOutline={true} icon={SVGIconChevron} onClick={handleOnClick}>
            Кнопка 3
          </Button>
          <Button
            isOutline={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Кнопка 4
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button isSmall={true} onClick={handleOnClick} icon={SVGIcon}></Button>
          <Button isSmall={true} onClick={handleOnClick}>
            Label
          </Button>
          <Button isSmall={true} icon={SVGIcon} onClick={handleOnClick}>
            Label
          </Button>
          <Button isSmall={true} icon={SVGIconChevron} onClick={handleOnClick}>
            Label
          </Button>
          <Button
            isSmall={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Label
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button isSmall={true} isOutline={true} icon={SVGIcon} onClick={handleOnClick}></Button>
          <Button isSmall={true} isOutline={true} onClick={handleOnClick}>
            Label
          </Button>
          <Button isSmall={true} isOutline={true} icon={SVGIcon} onClick={handleOnClick}>
            Label
          </Button>
          <Button isSmall={true} isOutline={true} icon={SVGIconChevron} onClick={handleOnClick}>
            Label
          </Button>
          <Button
            isSmall={true}
            isOutline={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Label
          </Button>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button status="remove" onClick={handleOnClick} icon={SVGIcon}></Button>
          <Button status="remove" onClick={handleOnClick}>
            Кнопка 1
          </Button>
          <Button status="remove" icon={SVGIcon} onClick={handleOnClick}>
            Кнопка 2
          </Button>
          <Button status="remove" icon={SVGIconChevron} onClick={handleOnClick}>
            Кнопка 3
          </Button>
          <Button
            status="remove"
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Кнопка 4
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button status="remove" isOutline={true} icon={SVGIcon} onClick={handleOnClick}></Button>
          <Button status="remove" isOutline={true} onClick={handleOnClick}>
            Кнопка 1
          </Button>
          <Button status="remove" isOutline={true} icon={SVGIcon} onClick={handleOnClick}>
            Кнопка 2
          </Button>
          <Button status="remove" isOutline={true} icon={SVGIconChevron} onClick={handleOnClick}>
            Кнопка 3
          </Button>
          <Button
            status="remove"
            isOutline={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Кнопка 4
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button status="remove" isSmall={true} onClick={handleOnClick} icon={SVGIcon}></Button>
          <Button status="remove" isSmall={true} onClick={handleOnClick}>
            Label
          </Button>
          <Button status="remove" isSmall={true} icon={SVGIcon} onClick={handleOnClick}>
            Label
          </Button>
          <Button status="remove" isSmall={true} icon={SVGIconChevron} onClick={handleOnClick}>
            Label
          </Button>
          <Button
            status="remove"
            isSmall={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Label
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <Button
            status="remove"
            isSmall={true}
            isOutline={true}
            icon={SVGIcon}
            onClick={handleOnClick}
          ></Button>
          <Button status="remove" isSmall={true} isOutline={true} onClick={handleOnClick}>
            Label
          </Button>
          <Button
            status="remove"
            isSmall={true}
            isOutline={true}
            icon={SVGIcon}
            onClick={handleOnClick}
          >
            Label
          </Button>
          <Button
            status="remove"
            isSmall={true}
            isOutline={true}
            icon={SVGIconChevron}
            onClick={handleOnClick}
          >
            Label
          </Button>
          <Button
            status="remove"
            isSmall={true}
            isOutline={true}
            icon={SVGIconChevron}
            iconPositionRight={true}
            onClick={handleOnClick}
          >
            Label
          </Button>
        </div>
      </div>

      <br />
      <br />
    </>
  );
};

export default Step1Page;
