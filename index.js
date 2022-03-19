const { createApp, ref } = Vue;

Vue.createApp({
  setup() {
    let links = ref(null); //Store reponse
    let url = ref(""); // User url
    let input = ref(null); // Reference to input to copy on click
    let hasCopy = ref(false); // Has copy boolean to active btn
    let getResponse = ref(false); // Get response boolean to show links modal
    let error = ref(false); // Error boolean to active error class in input
    let mobileNavActive = ref(false); //Active or not mobile nav

    async function getData() {
      error.value = false; //Reset class of input
      if (
        !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
          url.value
        )
      )
        return (error.value = true); //Detect with regex if the url is valid

      await axios
        .post(`https://api.shrtco.de/v2/shorten?url=${url.value}`)
        .then((response) => (links.value = response.data.result))
        .catch(function (error) {
          console.log(error);
        });
      getResponse.value = true;
    }

    function copy() {
      hasCopy.value = true;
      input.value.focus();
      document.execCommand("copy");
    }

    function triggerMobileNav() {
      mobileNavActive.value = !mobileNavActive.value;
      if (mobileNavActive.value === true) {
        document.querySelector("body").style.position = "fixed";
      } else {
        document.querySelector("body").style.position = "relative";
      }
    }
    return {
      links,
      url,
      getResponse,
      input,
      hasCopy,
      error,
      mobileNavActive,
      copy,
      getData,
      triggerMobileNav,
    };
  },
}).mount("#app");
