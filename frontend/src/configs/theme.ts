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
  button: {
    padding: {
      vertical: '0px',
      horizontal: '12px'
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
