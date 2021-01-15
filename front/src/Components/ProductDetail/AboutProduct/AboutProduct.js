import React, { Fragment } from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';
import AboutProductCss from './AboutProduct.module.css';

export const AboutProduct = ({url, opt, Alergenos_Trazas, Informacion_Nutricional}) => {

    const {energy_kcal_value, fat_100g, salt_100g, saturated_fat_100g, sugars_100g} = Informacion_Nutricional;

	const [{data, isLoading}] = useOptionsList(url, JSON.stringify(opt))

    const allergensPainter = () => {
        if(Alergenos_Trazas){
			const validAllergens = ["en:nuts", "en:peanuts", "en:eggs", "en:gluten-free"];
            let validatedAllergens = Alergenos_Trazas.filter(allergen => validAllergens.includes(allergen));
            if(validatedAllergens.length){
                return <div className={AboutProductCss.allergensImgContainer}>
                            {validatedAllergens.map(allergens => {
                                const RealAllergen = allergens.substring(3);
                                return <Fragment key={allergens}>
                                            <img src={`/alergenosIconos/${RealAllergen}.svg`} alt={`Alérgeno ${RealAllergen}`} className={AboutProductCss.imgAllergen} />
                                       </Fragment>
                            })}
                        </div>

            }
        } else {
            //HACER
        }

    }

    const AdditivesPainter = () => {
        if(data && !isLoading){
            const {res, additives} = data;
            if(res === "1" && additives){
                return (
					<table className={AboutProductCss.additivesInfoTable}>
                        <tr>
                            <th>Name</th>
                            <th>Riesgo</th>
                            <th>+info</th>
                        </tr>
                        
                            {additives.map(({full_name, more_info, risk_level}) => {
                                return <Fragment key={full_name}>
											<tr>
												<td>{full_name}</td>
												<td>{risk_level}</td>
												<td><a href={more_info} target="_blank" rel="noreferrer"><i className="fas fa-plus-circle"></i></a></td>
											</tr>
                                       </Fragment>
                            })}
                        
                    </table>
				)
            }
        }
    }


    return <>
                <div className={AboutProductCss.allergensContainer}>
                    <p className={AboutProductCss.allergensTitle}>Alérgenos</p>
                    {allergensPainter()}
                </div>
                <div className={AboutProductCss.NutritionContainer}>
                    <p className={AboutProductCss.nutritionTitle}>Información nutricional</p>
                    <p className={AboutProductCss.gramsTitle}>Por 100g:</p>
                    <div className={AboutProductCss.nutritionImgContainer}>
                        <div>
                            <img src={`/nutritionIcons/KcalIcon.svg`} alt="Kcal" className={AboutProductCss.imgNutrition} />
                            <p className={AboutProductCss.valueNutrition}>{energy_kcal_value}</p>
                        </div>
                        <div>
                            <img src={`/nutritionIcons/grasasIcon.svg`} alt="Grasas" className={AboutProductCss.imgNutrition} />
                            <p className={AboutProductCss.valueNutrition}>{fat_100g}</p>
                        </div>
                        <div>
                            <img src={`/nutritionIcons/grasasSaturadas.svg`} alt="Grasas Saturadas" className={AboutProductCss.imgNutrition} />
                            <p className={AboutProductCss.valueNutrition}>{saturated_fat_100g}</p>
                        </div>

                        <div>
                            <img src={`/nutritionIcons/saltIcon.svg`} alt="Sal" className={AboutProductCss.imgNutrition} />
                            <p className={AboutProductCss.valueNutrition}>{salt_100g}</p>
                        </div>

                        <div>
                            <img src={`/nutritionIcons/sugarIcon.svg`} alt="Azúcares" className={AboutProductCss.imgNutrition} />
                            <p className={AboutProductCss.valueNutrition}>{sugars_100g}</p>
                        </div>

                    </div>
                </div>

                <div className={AboutProductCss.additivesContainer}>
                    <p className={AboutProductCss.additivesTitle}>Aditivos</p>
                    {AdditivesPainter()}
                </div>
           </>
}
