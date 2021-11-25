import * as React from "react";
import Offre from "./Offre";

const Offres = ({ offres, onOffrePress }) => {
  return offres.map((offre) => (
    <Offre offre={offre} onPress={onOffrePress} />
  ));
};

export default Offres;