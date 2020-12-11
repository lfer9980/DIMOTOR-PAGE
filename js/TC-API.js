(async function load() {  
    //setting API CONST TO MAKE FETCH
    const API_BASE ='https://www.banxico.org.mx/SieAPIRest/service/v1/series/'
    const API_SERIES_1 = 'SF60653'
    const API_TOKEN = 'token=b331a53dc6572088af01ea0fdfdc39f2e9e5dfb60960942c47de723eee3f08cd'
    const date = new Date()
    //GET DATA FROM API
    async function getData(request,API_INIT) {
        const response = await fetch(request, API_INIT)
        const data = await response.json()
        return data
    }
    //setting CONST FOR DATE 
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth()+1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const todayDate = `/${year}-${month}-${day}`
    //convert the month number on his name abv
    function convertMonthName(date) {
        const MONTH_NAME = new Array('EN','FEB','MAR','ABR','MAY',"JUN","JUL","AGO","SEP","OCT","NOV","DIC")
        const monthName = MONTH_NAME[date.getMonth()]
        return monthName
    }
    //creates TEMPLATE for Type change
    function tcTemplate(exchange,date,month,year,position) {
        if (position === "superior")
            return (
                `
                <p>     
                <span class= "TC">$ ${exchange} MXN</span>
                <span class="date">/ ${date} ${month} ${year}</span>
                </p>
                ` 
                )
        else if (position === "principal")
        return (
            `
            <p>
            <span class="date-today"> ${date} ${month} ${year}</span> <br>
                    <span class= "TC">$ ${exchange}</span>
                    </p>
                `               
            )
    }
    //creates template ready to use it in HTML    
    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString
        return html.body.children[0]
    }
    //deconstruct type change to extract dato info
    function deconstructDato(TC) {
        const { datos } = TC
        const { dato, fecha } = datos[0]
        return dato
    }
    
    //REQUEST TO API
    const {bmx: { series: tcDate} } = await getData(`${API_BASE}${API_SERIES_1}/datos/${todayDate}${todayDate}?${API_TOKEN}`)

    const exchange = deconstructDato(tcDate[0])
    const MonthName = convertMonthName(date)
    
    const $tcSupContainer = document.getElementById('tc-superior')
    const HTMLStringSup = tcTemplate(exchange, day, MonthName, year, "superior")
    const TCSup = createTemplate(HTMLStringSup)
    $tcSupContainer.append(TCSup)

    const $tcPrinContainer = document.getElementById('tc-principal')
    const HTMLStringPrin = tcTemplate(exchange, day, MonthName, year, "principal")
    const TCPrin = createTemplate(HTMLStringPrin)
    $tcPrinContainer.append(TCPrin
}) () 