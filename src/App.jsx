import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarID } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto();
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );

      setGastos(gastosActualizados);
    } else {
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const datosActualizado = gastos.filter((gasto) => gasto.id !== id);
    setGastos(datosActualizado);
  };

  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal={setModal}
            setAnimarModal={setAnimarModal}
            animarModal={animarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )}
      </div>
    </>
  );
}

export default App;
