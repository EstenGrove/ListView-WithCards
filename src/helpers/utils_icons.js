import styles from "../css/MainContainer.module.scss";

export const iconsReducer = type => {
  switch (true) {
    case type === "Dressing" || type === "Dress": {
      return {
        icon: "accessibility",
        styles: {
          fill: "hsla(268, 10%, 30%, .2)"
        }
      };
    }
    case type === "Grooming" || type === "Groom": {
      return {
        icon: "face",
        styles: {
          fill: "hsla(144, 69%, 63%, .4)"
        }
      };
    }
    case type === "Bathing" || type === "Bath": {
      return {
        icon: "bathtub",
        styles: {
          fill: "hsla(222, 89%, 64%, .3)"
        }
      };
    }
    case type === "MedAssist" || type === "Meds": {
      return {
        icon: "sentiment_very_dissatisfied",
        styles: {
          fill: "hsla(330, 100%, 41%, .22)"
        }
      };
    }
    case type === "Psychosocial" || type === "Mental": {
      return {
        icon: "news",
        styles: {
          fill: "hsla(11, 100%, 75%, .4)"
        }
      };
    }
    case type === "StatusChecks" || type === "Health": {
      return {
        icon: "timer",
        styles: {
          fill: "hsla(259, 77%, 64%, .4)"
        }
      };
    }
    case type === "Toileting" || type === "Toilet": {
      return {
        icon: "new_releases",
        styles: {
          fill: "hsla(268, 10%, 30%, .2)"
        }
      };
    }
    case type === "SpecialCare" || type === "Care": {
      return {
        icon: "new_releases",
        styles: {
          fill: "hsla(144, 69%, 63%, .4)"
        }
      };
    }
    case type === "Ambulation" || type === "Ambulate": {
      return {
        icon: "bus_alert",
        styles: {
          fill: "hsla(330, 100%, 41%, .22)"
        }
      };
    }
    case type === "Transfers": {
      return {
        icon: "transfer_within_a_station",
        styles: {
          fill: "hsla(268, 10%, 30%, .2)"
        }
      };
    }
    case type === "Laundry": {
      return {
        icon: "local_laundry_service",
        styles: {
          fill: "hsla(197, 100%, 50%, .3)"
        }
      };
    }
    case type === "Meals": {
      return {
        icon: "restaurant",
        styles: {
          fill: "hsla(259, 77%, 64%, .4)"
        }
      };
    }
    case type === "All": {
      return {
        icon: "perm_contact_calendar",
        styles: {
          fill: "hsla(218, 17, 65, 1)"
        }
      };
    }
    case type === "Other": {
      return {
        icon: "assignment_ind",
        styles: {
          fill: "hsla(218, 17, 65, 1)"
        }
      };
    }
    default:
      return new Error("Category type not recognized");
  }
};

export const micStyles = state => {
  switch (state) {
    case "ON":
      return `${styles.modal_recording_icon} ${styles.on}`;
    case "OFF":
      return `${styles.modal_recording_icon} ${styles.off}`;
    case "DISABLED":
      return `${styles.modal_recording_icon} ${styles.disabled}`;
    case "RECORDING":
      return `${styles.modal_recording_icon} ${styles.recording}`;
    default:
      return `${styles.modal_recording_icon} ${styles.off}`;
  }
};

export const micIcon = state => {
  switch (state) {
    case "ON":
      return "mic";
    case "OFF":
      return "mic_off";
    case "DISABLED":
      return "mic_none";
    case "RECORDING":
      return "mic";
    default:
      return "mic_off";
  }
};
