const returnAscending = (a, b) => {

    if (a.siniiiga < b.siniiiga) {
        return -1
    }
    if (a.siniiiga > b.siniiiga) {
        return 1
    }
}


const returnDescending = (a, b) => {
    if (b.siniiiga < a.siniiiga) {
        return -1
    }
    if (b.siniiiga > a.siniiiga) {
        return 1
    }

}

const orderDates = (a , b) => {
    if (a.createdAt < b.createdAt) {
        return -1
    } else {
        return 1
    }
}

const reverseDates = (a , b) => {
    if (a.createdAt < b.createdAt) {
        return 1
    } else {
        return -1
    }
}
const deReversa = (a , b) => {
    if (a.fecha < b.fecha) {
        return -1
    } else {
        return 1
    }
}
const changeIt = (a , b) => {
    if (a.fecha < b.fecha) {
        return 1
    } else {
        return -1
    }
}

module.exports = {reverseDates, orderDates, returnAscending, returnDescending, deReversa, changeIt}
