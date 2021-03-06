const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
})

const formatCurrency = x => {
	const currency = formatter.format(x)
	return currency
}

export const formatArray = arr => {
	const arrayFormated = arr.map(el => {
		el.Codigo = el.folioItem
		el.Descripcion = el.producto
		el.Unidad = el.unidad
		el.Observacion = el.anotaciones
		el.Cantidad = el.requeridos
		el['Costo Unitario'] = formatCurrency(el.costounitario)
		el.Subtotal = formatCurrency(el.subtotal)

		delete el.folioItem
		delete el.categoria
		delete el.subcategoria
		delete el.producto
		delete el.unidad
		delete el.requeridos
		delete el.costounitario
		delete el.anotaciones
		delete el.sostenimiento
		delete el.condiciones
		delete el.subtotal

		return el
	})
	return arrayFormated
}

export const formatCardFolioObra = ( respObrasDisp ) => {
	const folioObra = respObrasDisp.map(obra => (
        {
        folioObra: obra.folio_obra,
        nombreObra: obra.nombre_obra
        }
    ))
	return folioObra
}

export const formatCardFolioCoti = (respObrasCoti) => {
	const folioCoti = respObrasCoti.map(obra => (
        {
        folioObra: obra.folio_obra,
        folioCotizacion: obra.folio_cotizacion,
        nombreObra: obra.nombre_obra,
        }
	))
	return folioCoti
}

export const listaCategorias = (obra) => {
	return [...new Set(obra.map(e => (e.categoria)))]
}

export const listaSubCategorias = (obra, categoria) => {
	const resultado = obra.filter(e => e.categoria === categoria)
	return [...new Set(resultado.map(e => (e.subcategoria)))]
}

export const listaProductos = (obra, subcategoria) => {
	const resultado = obra.filter(e => e.subcategoria === subcategoria)
	return [...new Set(resultado.map(e => (e.producto ? e.producto: e.nombre)))]
}