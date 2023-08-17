const form = document.querySelector("#write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();

  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());

  try {
    const response = await fetch("/items", {
      method: "POST",
      body,
    });

    const data = await response.json();
    console.log("data: ", data);

    if (data === "200") {
      window.location.pathname = "/";
    }
  } catch (error) {
    console.log("포스팅에 실패했습니다.");
  }
};

form.addEventListener("submit", handleSubmitForm);
