import { signUp } from "./signup";
const signUpForm = document.querySelector(".form--signedUp");
if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const activeEmail = document.getElementById("activeEmail").value;
    const activeNumber = document.getElementById("activeNumber").value;
    const desireJambScore = document.getElementById("desireJambScore").value;
    const onBipume = document.getElementById("onBipume").value;
    const joinBipume = document.getElementById("joinBipume").value;
    signUp(
      fullName,
      activeEmail,
      activeNumber,
      desireJambScore,
      onBipume,
      joinBipume
    );
  });
}
