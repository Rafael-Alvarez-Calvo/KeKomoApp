import React from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';
import InfoSuppliersCss from './InfoSuppliers.module.css'

export const InfoSuppliers = ({url, opt}) => {
    
	const [{isLoading, data}] = useOptionsList(url, JSON.stringify(opt));
	console.log(data);

	const getDataSupplier = () => {
		
		if (data.Resultado) {
			let supplier = data.Resultado[0];
			return (
				<div className={InfoSuppliersCss.aboutSupplierInfoContainer}>
					<table className={InfoSuppliersCss.aboutSupplierInfoTable}>
                        <tr className={InfoSuppliersCss.tableRows}>
                            <th className={InfoSuppliersCss.tableHead}>Nombre</th>
                            <th className={InfoSuppliersCss.tableHead}>EMB</th>
                            <th className={InfoSuppliersCss.tableHead}>Marca</th>
                        </tr>
						<tr>
							<td className={InfoSuppliersCss.tableDep}>{supplier.proveedor}</td>
							<td className={InfoSuppliersCss.tableDep}>{supplier.emb_code}</td>
							<td className={InfoSuppliersCss.tableDep}>{supplier.marca}</td>
						</tr>
						{/* {
							data.Resultado.map(certificate => (
								<div>
									<p>{certificate.norma}</p>
									<p>{certificate.descripcion}</p>
								</div>
							))
						} */}
					</table>
					<table className={InfoSuppliersCss.aboutSupplierInfoTable}>
                        <tr className={InfoSuppliersCss.tableRows}>
                            <th className={InfoSuppliersCss.tableHead}>Direccion</th>
                        </tr>
						<tr>
							<td className={InfoSuppliersCss.tableDep}>{supplier.direccion}</td>
						</tr>
					</table>
				</div>
			)
		}
		else {
			return (
				<p>Lo sentimos no disponemos de información del proveedor para este producto.</p>
			)
		}
	}

	const getDataCertificates = () => {
		
		if (data.Resultado) {
			
			return <div className={InfoSuppliersCss.aboutSupplierInfoContainer}>
							{data.Resultado.map(certificate => {
								return <div key={certificate.norma}>
											<table className={InfoSuppliersCss.aboutSupplierInfoTable}>
												<tr className={InfoSuppliersCss.tableRows}>
													<th className={InfoSuppliersCss.tableHead}>Nombre del certificado</th>
												</tr>
												<tr>
													<td className={InfoSuppliersCss.tableDep}>{certificate.norma}</td>
												</tr>
												<tr className={InfoSuppliersCss.tableRows}>
													<th className={InfoSuppliersCss.tableHead}>Descripción</th>
												</tr>
												<tr>
													<td className={InfoSuppliersCss.tableDep}>{certificate.descripcion}</td>
												</tr>
											</table>
									  </div>
							})}
					</div>

		} else {
			return (
				<p>Lo sentimos no disponemos de información de certificados del proveedor para este producto.</p>
			)
		}
	}

	const getNameSupplier = () => {
		if (data.Resultado) {
			let supplierName = data.Resultado[0];
			return <>
					<h1 className={InfoSuppliersCss.nameSupplier}>{supplierName.proveedor}</h1>
				   </>

		} else {
			return <></>
		}
	}



	return <>
			{!isLoading && getNameSupplier()}
			<div className={InfoSuppliersCss.aboutSupplierContainer}>
				<h2 className={InfoSuppliersCss.aboutSupplierTitle}>Sobre el productor</h2>
				{!isLoading && getDataSupplier()}
			</div>

			{/* <img src="/arcoProductores.svg" className={InfoSuppliersCss.arcoSeparator}/> */}
			{isLoading && <div className={InfoSuppliersCss.loadingSVGContainer}><img src="/loading.svg" className={InfoSuppliersCss.loadingSVG} alt="loading icon" /></div>}

			<div className={InfoSuppliersCss.CertificatesContainer}>
				<h2 className={InfoSuppliersCss.aboutSupplierTitle}>Certificados</h2>
				{!isLoading && getDataCertificates()}
			</div>
            	
			
			</>
}

