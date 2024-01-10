/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Mensaje = ({ children, tipo }) => {
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

export default Mensaje;
