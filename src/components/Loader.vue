<template>
  <div class="loader">
    <div class="dot1"></div>
    <div class="dot2"></div>
    <div class="dot3"></div>
  </div>
</template>

<style>
.loader {
  /* center the loader */
    display: inline-block;
    position: absolute;
    top: 10px;
    left: calc(50% - 8px);
}

.dot1,
.dot2,
.dot3 {
  /* create three circles with border */
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

.dot1 {
  /* position the first dot */
  position: absolute;
  left: -20px;
  background-color: #dabcae;
  /* change the color to light grey */
}

.dot2 {
  /* position the second dot */
  position: absolute;
  background-color: #d68a57;
  /* change the color to white */
}

.dot3 {
  /* position the third dot */
  position: absolute;
  left: 20px;
  background-color: #ba582e;
  /* change the color to dark grey */
}

.dot1,
.dot3 {
  /* add animation to the first and third dots */
  animation: bounce 2s infinite ease-in-out;
}

.dot2 {
  /* add animation to the second dot */
  animation: bounce2 2s infinite ease-in-out;
}

/* define the animation keyframes */
@keyframes bounce {
  from,
  to {
    transform: translateY(0);
    opacity: 0.5;
  }

  25% {
    transform: translateY(-10px);
    opacity: 0.5;
  }
}

@keyframes bounce2 {
  from,
  to {
    transform: translateY(0);
    opacity: 0.5;
  }

  50% {
    transform: translateY(-10px);
    opacity: 0.5;
  }
}
</style>
