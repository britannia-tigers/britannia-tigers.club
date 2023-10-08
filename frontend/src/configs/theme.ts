import { ThemeType } from "grommet";


export const theme /*: ThemeType*/ = {
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
  }
}
