import { ThemeType } from "grommet";
import { css } from "styled-components";


export const theme = {
  global: {
    font: {
      family: "din-2014, sans-serif",
      weight: 600,
      size: "18px",
      height: "20px",
    },
    colors: {
      brand: '#F7EC13',
      control: '#F7EC13',
      focus: '#F7EC13',
      "status-ok": '#F7EC13' 
    },
    focus: {
      shadow: 'none'
    }
  },
  fileInput: {
    pad: {
      horizontal: 'small',
      top: 'xsmall',
      bottom: 'none'
    },
    border: false,
    button: {
      border: false,
      // border: {
      //   radius: '20px'
      // },
      // radius: '4px',
      // background: {
      //   color: '#333333'
      // },
      // color: 'white',
      extend: css`
        margin: 0;
        margin-left: -24px;
        padding: 0px;
        font-size: 14px;
        text-decoration: underline;
        /* border-radius: 2px; */
      `
    },
    message: {
      size: 'small'
    },
    label: {
      size: 'small'
    },
    hover: {
      border: false
    },
  },
  button: {
    padding: {
      vertical: '0px',
      horizontal: '12px'
    },
    primary: {

    },
    disabled: {
      opacit: 1,
      border: {
        color: 'rgba(170, 170, 170, 1)'
      },
      color: 'rgba(180, 180, 180, 1)'
    }
  },
  formField: {
    label: {
      size: 'small',
      margin: {
        horizontal: '0px',
        bottom: '0px'
      }
    },
    error: {
      size: 'small',
      margin: {
        horizontal: '0px'
      }
    },
    border: {
      position: 'inner',
      side: 'bottom',
    },
    margin: {
      vertical: '18px',
      horizontal: '0px'
    },
    focus: {
      border: {
        color: 'transparent'
      }
    }
  },
  calendar: {
    extend: css`
      box-shadow: none;
      align-items: center;
    `,
    day: {
      extend: css`
        align-items: center;
        border-radius: 2px;
        :hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `
    },
    medium: {
      fontSize: '14px',
      daySize: '30px'
    }
  }
} as ThemeType
