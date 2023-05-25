console.log("🟢 Connected!");

const formulario = document.querySelector("form");
const alert = document.querySelector("#alert");

let msg = "";
const alertManagement = {
  active: false,
  layouts: [
    {
      type: "success",
      classes: "bg-green-200 text-green-900 p-4 rounded",
    },
    {
      type: "danger",
      classes: "bg-red-200 text-red-900 p-4 rounded",
    },
  ],
};

const manejarMensaje = (message) => {
  return new Promise((resolve, reject) => {
    if (!message) {
      resolve({
        status: true,
        message: "Mensaje enviado!",
      });
    } else {
      reject({
        status: false,
        message: "Ya has enviado un mensaje. No puedes enviar otro!",
      });
    }
  });
};

const manejarAlert = (content) => {
  if (!alertManagement.active) {
    alertManagement.active = true;
  }

  if (content.status) {
    alert.classList = alertManagement.layouts[0].classes;
  } else {
    alert.classList = alertManagement.layouts[1].classes;
  }

  alert.textContent = content.message;

  const timer = setTimeout(() => {
    alertManagement.active = false;
    alert.classList = "hidden";
  }, 3000);
};

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(formulario);
  const dataObjeto = Object.fromEntries(data);

  try {
    const res = await manejarMensaje(msg);
    msg = dataObjeto.mensaje;

    console.log(
      `--Para: ${dataObjeto.destinatario}
${dataObjeto.mensaje}`
    );

    setTimeout(() => {
      msg = "";
    }, 5000);

    manejarAlert(res);
  } catch (error) {
    manejarAlert(error);
  }
});
