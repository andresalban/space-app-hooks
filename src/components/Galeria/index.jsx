import styled from "styled-components"
import Titulo from "../Titulo"
import Populares from "./Populares"
import Tag from "./Tags"
import Imagen from "./Imagen"
import Cargando from "../Cargando/index.jsx";
import {GlobalContext} from "../../context/GlobalContext.jsx";
import {useContext} from "react";

const GaleriaContainer = styled.div`
    display: flex;
    gap: 24px;
`

const SeccionFluida = styled.section`
    flex-grow: 1;
`
const ImagenesContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
`


const Galeria = () => {

    const { consulta, fotosDeGaleria, alAlternarFavorito, setFotoSeleccionada } = useContext(GlobalContext);
    return (
        fotosDeGaleria.length == 0 ?
            <Cargando></Cargando>:
        <>
            <Tag/>
            <GaleriaContainer>
                <SeccionFluida>
                    <Titulo>Navegue por la galería</Titulo>
                    <ImagenesContainer>
                        {fotosDeGaleria.filter(foto => {
                            return consulta === '' || foto.titulo.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
                                .includes(consulta.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
                        }).map(foto => <Imagen
                            alAlternarFavorito={alAlternarFavorito}
                            alSolicitarZoom={foto => setFotoSeleccionada(foto)}
                            key={foto.id}
                            foto={foto}/>)
                        }
                    </ImagenesContainer>
                </SeccionFluida>
                <Populares/>

            </GaleriaContainer>
        </>
    )
}

export default Galeria