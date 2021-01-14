import React, { Fragment } from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';
import AboutProductCss from './AboutProduct.module.css';

export const AboutProduct = ({url, opt, Aditivos, Alergenos_Trazas, Informacion_Nutricional}) => {

    const validAllergens = [];
    const {energy_kcal_value, fat_100g, salt_100g, saturated_fat_100g, sugars_100g} = Informacion_Nutricional;

    const [{data, isLoading}] = useOptionsList(url, JSON.stringify(opt))

    const allergensPainter = () => {
        if(Alergenos_Trazas){
            let validatedAllergens = Alergenos_Trazas.filter("en:nuts", "en:peanuts", "en:eggs", "en:gluten-free");
            if(validatedAllergens){
                return <div className={AboutProductCss.allergensImgContainer}>
                            {Alergenos_Trazas.length && [validatedAllergens].map(allergens => {
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
                return <>
                        </>
            }
        }
    }

    

    return <>
                <div className={AboutProductCss.allergensContainer}>
                    <p className={AboutProductCss.allergensTitle}>Alérgenos</p>
                    {/* {allergensPainter()} */}
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

                <div className={AboutProductCss.allergensContainer}>
                    <p className={AboutProductCss.allergensTitle}>Alérgenos</p>
                    {/* {allergensPainter()} */}
                </div>
                
           </>
    
}
