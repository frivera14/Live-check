
module.exports =  (timestamp) => {
  const dateObj = new Date(timestamp)

  const monthMap = {
    "01": 'Enero',
    "02": 'Feb',
    "03": 'Marzo',
    "04": 'Abril',
    "05": 'Mayo',
    "06": 'Junio',
    "07": 'Julio',
    "08": 'Agosto',
    "09": 'Septiembre',
    "10": 'Octubre',
    "11": 'Noviembre',
    "12": 'Diciembre'
  };

  const mes = dateObj.getMonth()
  const dia = dateObj.getDate()
  const year = dateObj.getFullYear()


  const formatedDate = `${dia} de ${mes}, ${year}`

  return formatedDate

} 
