import { Certificate } from 'crypto';
import React from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';

export const InfoSuppliers = ({url, opt}) => {
    
	const [{isLoading, data}] = useOptionsList(url, JSON.stringify(opt));
	console.log(data);
	if (data.Resultado) {
		let supplier = data.Resultado[0];
		return (
			<div>
				<p>{supplier.proveedor}</p>
				<p>Certificados:</p>
				<div>
					{
						data.Resultado.map(certificate => (
							<div>
								<p>{certificate.norma}</p>
								<p>{certificate.descripcion}</p>
							</div>
						))
					}
				</div>
			</div>
		)
	}
	else {
		return (
			<p>No data</p>
		)
	}
}

