import axios from "axios";
import { showAlert } from "./alerts";
export const signUp = async (
  fullName,
  activeEmail,
  activeNumber,
  desireJambScore,
  onBipume,
  joinBipume
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        fullName,
        activeEmail,
        activeNumber,
        desireJambScore,
        onBipume,
        joinBipume,
      },
    });
    if (res.data.status === "success") {
      showAlert(
        "success",
        "You have successfully registered for BIPUME FREE MOCK, Kindly check Your Mail for Your Exam details"
      );
      window.setTimeout(() => {
        location.assign("http://127.0.0.1:4000/signup"), 1500;
      });
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
