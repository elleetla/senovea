switch(event.value) {
    case "Antilles-Guyane" :
        this.getField("adresse_expediteur").setItems(["9 rue des prés","8 rue des lilas","10 rue des pommes","11 rue des fraises","15 rue des framboises","16 rue des prunes","17 rue des aubergines", "8 cours emile loubet", "78 avenue lombard","15 avenue des prés","18 cours hugo giris","25 allée fleurie"]);
        break;
    case "Bourgogne-Franche-Comté":
        this.getField("adresse_expediteur").setItems(["1 rue bubin","8 rue des lilas","2 rue des prés fleuris","3 rue des fruits","6 rue des pommes","7 avenue des poires","27 rue des auberges","8 cours du couscous","88 avenue des épices","1 avenue des champs","3 allée girisant","5 allée des prunes"]);
        break;
    case "Bretagne":
        this.getField("adresse_expediteur").setItems(["3 avenue du pain","6 rue du clavier","101 rue pavée","31 avenue des poires"," 28 rue des framboises","56 allée fauriel","17 rue des aubes","108 cours emile loubet","78 rue lombard","156 rue des champs","218 cours martin galle","35 avenue dupont"]);
        break;
    case "Corse":
        this.getField("adresse_expediteur").setItems(["89 allée des pommes","108 rue des lilas","910 rue des pommes","311 rue des fraises","256 rue non pavée","16 rue des prunes","17 rue des aubergines","8 cours loubet","78 avenue de lombard","165 boulevard des prés","18 cours giris","156 rue fleurie"]);
        break;
    case "Haut de france":
        this.getField("adresse_expediteur").setItems(["56 boulevard des prés","808 rue des lilas","10 rue des poires","121 avenue des fraises","158 rond-point des framboises","196 rue des pommes","107 rue des courges","8 cours emet","278 avenue lombard","125 avenue des prés","218 cours hugo giris","325 allée fleurie"]);
        break;
    case "Île de France":
        this.getField("adresse_expediteur").setItems(["896 rue de jules ","596 allée de cassis","10 rue du pommier","211 rue des prunes","315 rue des fleurs d’oranger","216 rue des poires","217 rue des taupes","58 cours de tennist","378 avenue lombard","155 avenue des prés","158 cours huis","25 allée fleurie"]);
        break;
    case "Occitanie":
        this.getField("adresse_expediteur").setItems(["89  allée hugo","89 rue des lys","101 rue des prunes","256 rue des poires","125 rue des framboises","146 rue des prunes","157 rue des aubergines","85 cours emile loubet","758 avenue lombard","125 avenue des prés","128 cours hugo giris","225 allée fleurie"]);
        break;
    case "Pays de la loire":
        this.getField("adresse_expediteur").setItems(["56 rue deschamps","9 allée de maupassant","310 rue des pommes","411 rue des fraises","155 rue des framboises","176 rue du marché du village","157 rue des aubergines","8 cours emile loubet","748 avenue lombard","175 avenue des prés","318 cours hugo giris","3 allée des macarons"]);
        break;
}