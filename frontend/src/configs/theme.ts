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
  tag: {
    size: {
      xsmall: {
        pad: {
          horizontal: 'small',
          vertical: '2px'
        }
      }
    },
    name: {
      size: '10px',
      textAlign: 'center',
    },
    
  },
  button: {
    badge: {
      container: {
        pad: {
          vertical: '2px',
          horizontal: '1px'
        },
        extend: css`
          margin-right: 5px;
          margin-top: 16px;
        `
      },
      text: {
        size: {
          medium: 'xsmall'
        }
      }
    },
    default: {
      border: {
        width: '1px'
      },
      background: {
        color: 'black'
      },
      color: 'white'
    },
    padding: {
      vertical: '0px',
      horizontal: '12px'
    },
    primary: {
      background: {
        color: 'brand'
      },
      border: { color: 'brand', width: '1px' },
    },
    secondary: {
      border: { color: 'black', width: '1px' },
      color: 'text'
    },
    disabled: {
      opacit: 1,
      border: {
        color: 'rgba(170, 170, 170, 1)',
      },
      background: {
        color: 'rgba(170, 170, 170, 1)'
      },
      color: 'white'
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
    // extend: css`
    //   box-shadow: none;
    //   align-items: center;
    // `,
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
