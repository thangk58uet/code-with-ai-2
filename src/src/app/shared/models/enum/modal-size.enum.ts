export enum ModalSizeOptions {
    SMALL = 'SMALL',
    M_SMALL = 'M_SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
    EXTRA_LARGE = 'EXTRA-LARGE',
    FULL_SCREEN = 'FULL_SCREEN'
  }
  
  export const MODAL_SIZE = {
    small: { value: 'small', width: "40vw", height: "auto", bottom: "30vh", right: "30vw" },
    m_small: { value: 'm_small', width: "50vw", height: "auto", bottom: "20vh", right: "25vw" },
    medium: { value: 'medium', width: "60vw", height: "auto", bottom: "15vh", right: "20vw" },
    large: { value: 'large', width: "75vw", height: "auto", bottom: "7.5vh", right: "12.5vw" },
    extra_large: { value: 'extra-large', width: "90vw", height: "auto", bottom: "5vh", right: "5vw" },
    full_screen: { value: 'full_screen', width: "100vw", height: "auto", top: '0px', left: '0px' },
    minimize: { value: 'minimize', width: "370px", height: "40px", bottom: "1vh", right: "1vw" },
  }
  