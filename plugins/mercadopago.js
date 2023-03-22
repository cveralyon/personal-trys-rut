import Vue from 'vue';
import axios from "axios";

const mp = {
  clientId: '2058354633842917',
  clientSecret: 'uL02sDFOhj80PfofVDPTlLBS4g4BfKdc',

  appProd: {
    publicKey: 'APP_USR-cc3b3a2a-6b4a-4e06-871a-ea024b270929',
    AccessToken: 'APP_USR-2058354633842917-080413-0726d47dc0fdfef5db69ffed6521b7bc-829436795',
    notification: 'https://www.rutero.cl/notifications?mode=test'
  },
  appDev: {
    publicKey: 'TEST-bcb90a37-3731-4bd1-afa4-f8d4f900e199',
    AccessToken: 'TEST-4681371288796902-022219-2ce0aee270b9474e4341022c613103bb-34697061',
    notification: 'https://www.rutero.cl/notifications?mode=prod'
  },
  general: {
    marketplace_prefix: 'MP-MLC',
    currency_id: 'CLP',
    identification_id: "RUT",
    category_id: "Travels",
    external_reference: "rutero-res-",
    statement_descriptor: "RESERVA ALOJAMIENTO RUTERO.CL",
    locale: 'es-CL',
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 1,
    },
    back_urls: {
      success: "https://www.rutero.cl/successreservation?sitestatus=success",
      pending: "https://www.rutero.cl/successreservation?sitestatus=pending",
      failure: "https://www.rutero.cl/successreservation?sitestatus=failure",
    },
    paymentMethodsPreference: {
      "excluded_payment_methods": [
        {}
      ],
      "excluded_payment_types": [
        {}
      ],
      installments: 1,
      default_installments: 1
    },
    auto_return: "all"
  },
  supplier: {
    authUrl: 'https://auth.mercadopago.com/authorization',
    authTokenUrl: 'https://api.mercadopago.com/oauth/token',
    redirectUrl: 'https://www.rutero.cl/mercadopago/success',
  },
  payment: {
    url: "https://api.mercadopago.com/v1/payments",
  },
  preference: {
    url: "https://api.mercadopago.com/checkout/preferences",
  },
  refund: {
    create: "https://api.mercadopago.com/v1/payments/{id}/refunds",
    get: 'https://api.mercadopago.com/v1/chargebacks/{id}',
    getall: 'https://api.mercadopago.com/v1/payments/{id}/refunds',
    getrefund: 'https://api.mercadopago.com/v1/payments/{id}/refunds/{refund_id}'

  },
  bricks: {
    containerId: 'cardPaymentBrick_container',
    alertSuccess: "alert-success",
    alertReject: "alert-reject",
    theme: 'flat',//'dark' | 'default' | 'bootstrap' | 'flat',
  },
  isProduction: true,

};


const rutero = {
  baseURL: 'https://rutero-backend.herokuapp.com',
  application_fee: 10, //decimal como porcentaje
  supplier: {
    update: "/api/v1/companies/mp_update/"
  },

  product: {
    update: "/api/v1/reservations/mp_hook_preference/",
    getbyId: "/api/v1/products/"
  },
  general: {
    adultText: "adulto",
    childText: "niño",
    nigthText: "noche"
  }
}
Vue.prototype.$mercadopago = mp;
Vue.prototype.$rutero = rutero;

export class pageApp {
  static page;
  static initApp(vm) {
    this.page = vm;
  }
  static async feedback() {
    // console.log(`QUERY=>${JSON.stringify(this.page.$route.query)}`)
    const sitestatus = this.page.$route.query.sitestatus;
    if (sitestatus != undefined || sitestatus != null) {
      let query=this.page.$route.query
      let result = await ruteroApp.reservationUpdateFromMP(query, sitestatus)

      // let respuesta = { 
      //   "sitestatus": "success", 
      //   "collection_id": "23397469641", 
      //   "collection_status": "approved", 
      //   "payment_id": "23397469641", 
      //   "status": "approved", 
      //   "external_reference": 
      //   "rutero-res-219", 
      //   "payment_type": "debit_card", 
      //   "merchant_order_id": "5034720438", 
      //   "preference_id": "34697061-e4ea5535-830a-4673-a09d-1fc9086800a2",
      //    "site_id": "MLC", 
      //    "processing_mode": "aggregator", 
      //    "merchant_account_id": "null" }
    }


  }
  static getTokenRutero() {
    return this.page.$auth.strategy.token.get()
  }


  static showAlertSuccess() {
    this.page.AlertSuccess = true;
  }
  static showAlertReject() {
    this.page.AlertReject = true;
  }
}


export class mercadopagoApp {
  static isMercadoPago() {
    return typeof MercadoPago != "undefined";
  }
  static headOnLoad() {
    return {
      script: [
        {
          src: 'https://sdk.mercadopago.com/js/v2',
          body: true,
        }
      ],
    }
  }
  static getKeys() {
    return mp.isProduction ? mp.appProd : mp.appDev;
  }
  static async getAccessToken(product_id, useCompanyToken = false) {
    let self = this;
    let accessToken = '';
    let companyinfo = {};
    try {
      if (useCompanyToken) {
        companyinfo = await ruteroApp.companyGetByProduct(product_id);
        // console.log(companyinfo);
        accessToken = companyinfo.data.product.access_token;
      }
      else
        accessToken = self.getKeys().AccessToken;
    } catch (e) {
      // console.log(e)
    }
    return accessToken;
  }
  static companyRedirectToMP(company_id) {
    if (!company_id) return;

    let urlredirect =
      mp.supplier.authUrl +
      "?client_id=" +
      mp.clientId +
      "&response_type=code&platform_id=mp&state=" +
      company_id +
      "&redirect_uri=" +
      mp.supplier.redirectUrl;

    window.location.href = urlredirect;
  }

  static async companyGetAuthApi(code, companyid) {
    // console.log('Se ejecutó fución')
    if (
      (code != null || code != undefined) ||
      (companyid != null || companyid != undefined)
    ) {

      // console.log(`Ha entrado ${code} ${companyid} `)
   
      const headers = {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      };
      const params = this.companyGetJsonAuth(code).toString();

      const url = mp.supplier.authTokenUrl + "?" + params;
      const body = {};
      const options = { headers };
      try {
        axios
          .post(url, body, options)
          .then((response) => {
            // response={"data":{
            //   "access_token":"APP_USR-4681371288796902-061316-68e3cdfee52fd7143922b0942225fd0f-1142179494",
            //   "token_type":"bearer",
            //   "expires_in":15552000,
            //   "scope":"offline_access payments read write",
            //   "user_id":1142179494,
            //   "refresh_token":"TG-62a79a713dd4db00136c75aa-1142179494",
            //   "public_key":"APP_USR-54627906-1a7d-489f-9d48-e0a5e04df720",
            //   "live_mode":true},
            //   "status":200,
            //   "statusText":""
            // }
            if (response.status == 200 || response.status == 201) {
              // console.log('Status ok')

              ruteroApp.companyUpdateFromMP(response, companyid)
            }

          })
          .catch((error) => {
            // console.log(JSON.stringify(error));
          })
      }
      catch (error) {
        // sentencias para manejar cualquier excepción
        // console.log(error); 
      }
    }
    // console.log('Función no ejecutada')

  }

  static companyGetJsonAuth(code) {
    if (!code) return

    let result = new URLSearchParams({
      client_secret: mp.clientSecret, //gave the values directly for testing
      grant_type: "authorization_code",
      client_id: mp.clientId,
      code: code,
      redirect_uri: mp.supplier.redirectUrl
    }).toString();
    return result;
  }
  static validateCost(cost) {
    return Math.round(cost);
  }


}

export class preferenceApiApp {

  static initApp(reserve, user) {
    // console.log(JSON.stringify(reserve));
    // console.log(JSON.stringify(user));
    let self = this;

    if (reserve != null || reserve != undefined) {
      if (!mercadopagoApp.isMercadoPago()) {
        setTimeout(function () {
          self.inicialize(reserve, user);
        }, 1500);
      }
      else {
        self.inicialize(reserve, user);
      }
    }
  }

  static async inicialize(reserve, user) {
    let self = this;

    try {
      // get companyinfo

      //preparejson
      let preference = self.prepareJson(reserve, user);
      // console.log(`PREFERENCE=>${JSON.stringify(preference)}`);

      await self.preferenceGet(preference, reserve.product_id);


    } catch (e) {
      // console.log(e)
    }

  }

  static prepareJson(reserve, user) {
    reserve.total_cost = mercadopagoApp.validateCost(reserve.total_cost);
    // preferenceJson.capture = false;
    // Set installments:
    
    if (reserve.total_cost > 100) { 
      mp.general.paymentMethodsPreference.installments = 3;
    }

    let preference = {
      items: this.getItems(reserve, user),
      payer: this.getPayer(user),
      marketplace: this.getMarketplaceid(),
      marketplace_fee: ruteroApp.feeGetValue(reserve.total_cost),
      transaction_amount: reserve.total_cost,
      payment_methods: mp.general.paymentMethodsPreference,
      external_reference: this.getExternalReference(reserve.id),
      description: ruteroApp.reserveGetDescription(reserve),
      statement_descriptor: mp.general.statement_descriptor,
      back_urls: mp.general.back_urls,
      notification_url: mercadopagoApp.getKeys().notification,
      auto_return: mp.general.auto_return
    }

    return preference;
  }

  static getExternalReference(reserveId) {
    return mp.general.external_reference + reserveId;
  }
  static getMarketplaceid() {
    return mp.general.marketplace_prefix + "-" + mp.clientId;
  }
  static getItems(reserve, user) {
    let ref = [
      {
        "id": reserve.id,
        "title": reserve.productName,
        "description": ruteroApp.reserveGetDescription(reserve),
        "category_id": mp.general.category_id,
        "category_descriptor": {
          "passenger": {
            "first_name": user.first_name,
            "last_name": user.last_name,
          }
        },
        "quantity": 1,
        "unit_price": reserve.total_cost
      }
    ];
    return ref;
  }

  static getPayer(user) {
    let payer = {
      "name": user.first_name,
      "surname": user.last_name,
      "email": user.email,
    }
    return payer;
  }

  static async preferenceGet(preferenceJson, product_id) {
    let self = this;
    if (!product_id) return;


    let accessToken = await mercadopagoApp.getAccessToken(product_id, true);
    // console.log(accessToken);
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.preference.url;
    const body = JSON.stringify(preferenceJson);
    const options = { headers };

    try {
      axios
        .post(url, body, options)
        .then((response) => {
          // console.log(`Preference response => ${JSON.stringify(response)}`);
          if (response.status != 200 && response.status != 201) {
            self.errorGetDetails(response);
          }
          else {
            let result = ruteroApp.reservationUpdateFromPreference(response)

            if (response.data.init_point) {
              window.location.href = response.data.init_point;
            }
          }

        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          self.errorGetDetails(error);
        })
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      self.errorGetDetails(error);

    }
  }
  static errorGetDetails(error) {
    pageApp.showAlertReject();
    if (error == undefined) return
    // sentencias para manejar cualquier excepción
    // console.log(error); // pasa el objeto de la excepción al manejador de errores
    var error_data = error;
    last = error_data.cause.length - 1;
    var message = this.ErrorGetHandler(error_data.cause[last].code)
    // console.log("verify filled data: " + message);

    error_data.success = false;
    error_data.error = message;
    return error;
  }

  static ErrorGetHandler(code) {

    var message = '';
    switch (code) {
      case "205":
        message = "Error, el número de la TDC no puede estar vácio"
        break;

      case "208":
        message = "Error, mes de expiración no puede estar vácio"
        break;


      case "209":
        message = "Error, año de expiración no puede estar vácio"
        break;

      case "214":
        message = "Error, documento de identidad inválido"
        break;


      case "221":
        message = "Error, el nombre del tarjetahabiente no puede ser vácio"
        break;


      case "325":
        message = "Error, mes de expiración inválido"
        break;

      case "326":
        message = "Error, año de expiración inválido"
        break;


      case "E301":
        message = "Error, año de expiración inválido"
        break;

      case "E302":
        message = "Error, código de seguridad inválido"
        break;

      default:
        message = "Error en datos de la TDC"
        break;

    }

    return message;

  }

}

export class refundsApiApp {

  static async create(reserve_id, amount = 0) {
    let self = this;
    //sección donde se trae la info de la reserva 
    let reservation = {
      "id": reserve_id,
      "product_id": 5173,
      "payment_id": 23601153731,
      "chargebacks_id": 1111,
    }
    let accessToken = mercadopagoApp.getAccessToken(reservation.product_id);

    if (accessToken == '') return;

    const refundJson = amount <= 0 ? {} : { amount: amount };
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.refund.create.replace('{id}', reservation.payment_id);
    const body = JSON.stringify(refundJson);
    const options = { headers };

    try {
      axios
        .post(url, body, options)
        .then((response) => {
          // console.log(JSON.stringify(response));
          if (response.status != 200 && response.status != 201) {

            self.errorGetDetails(response);
          }
          else {
            // respuesta estandar
            //   {
            //     "id":1152540892,//mp_refund_id Identificador único del refund
            //     "payment_id":23397469641,
            //     "amount":180,
            //     "metadata":{

            //     },
            //     "source":{
            //        "id":"34697061",
            //        "name":"Leonardo Alejandro Espinoza Jara",
            //        "type":"collector"
            //     },
            //     "date_created":"2022-06-28T12:40:48.812-04:00",
            //     "unique_sequence_number":null,
            //     "refund_mode":"standard",
            //     "adjustment_amount":0,
            //     "status":"approved",
            //     "reason":null,
            //     "labels":[

            //     ],
            //     "amount_refunded_to_payer":180,
            //     "partition_details":[

            //     ]
            //  }

          }

        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          self.errorGetDetails(error);
        })
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      // console.log(JSON.stringify(error));
      self.errorGetDetails(error);

    }

  }

  //   Obtener contracargo
  // GET
  // /v1/chargebacks/{id}
  // Consulta toda la información de un contracargo de tu producto o servicio con el ID del contracargo que quieras.
  /* id REQUERIDO String
  Localización: Path
  Identificador único del contracargo, este no se identifica como obtener */

  static async get(reserve_id) {
    let self = this;
    //sección donde se trae la info de la reserva 
    let reservation = {
      "id": reserve_id,
      "product_id": 1111,
      "payment_id": 1111,
      "chargebacks_id": 1111

    }
    let accessToken = mercadopagoApp.getAccessToken(reservation.product_id);

    if (accessToken == '') return;

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.refund.get.replace('{id}', reservation.chargebacks_id);
    const body = JSON.stringify(refundJson);
    const options = { headers };


    try {
      let res = await axios.get(url, body, options);
      // console.log(JSON.stringify(res));
      return res.data
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      // console.log(JSON.stringify(error));
      return false;
    }
  }

  static async getall(reserve_id) {
    let self = this;
    //sección donde se trae la info de la reserva 
    let reservation = {
      "id": reserve_id,
      "product_id": 1111,
      "payment_id": 1111,
      "chargebacks_id": 1111

    }
    let accessToken = mercadopagoApp.getAccessToken(reservation.product_id);

    if (accessToken == '') return;

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.refund.getall.replace('{id}', reservation.payment_id);
    const body = JSON.stringify(refundJson);
    const options = { headers };


    try {
      let res = await axios.get(url, body, options);
      // console.log(JSON.stringify(res));
      return res.data
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      // console.log(JSON.stringify(error));
      return false;
    }
  }


  static async getRefund(reserve_id) {
    let self = this;
    //sección donde se trae la info de la reserva 
    let reservation = {
      "id": reserve_id,
      "product_id": 1111,
      "payment_id": 1111,
      "chargebacks_id": 1111,
      "refund_id": 1111,
    }
    let accessToken = mercadopagoApp.getAccessToken(reservation.product_id);

    if (accessToken == '') return;

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.refund.getrefund.replace('{id}', reservation.payment_id).replace('{refund_id}', reservation.refund_id);
    const body = JSON.stringify(refundJson);
    const options = { headers };


    try {
      let res = await axios.get(url, body, options);
      // console.log(JSON.stringify(res));
      return res.data
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      // console.log(JSON.stringify(error));
      return false;
    }
  }


}



export class checkoutApiApp {

  static async paymentSave(paymentJson, reserve, user, authorization) {
    let self = this;

    try {
      // all tickers
      let companyinfo = await ruteroApp.companyGetByProduct(reserve.product_id);
      // console.log(companyinfo)
      paymentJson = self.prepareJson(paymentJson, reserve, user);
      // console.log(JSON.stringify(paymentJson));
      let send = await self.paymentSend(paymentJson, companyinfo, authorization);
    } catch (e) {
      // console.log(e)
    }

  }
  static prepareJson(paymentJson, reserve, user) {
    paymentJson.capture = false;
    paymentJson.external_reference = this.getExternalReference(reserve.id);
    paymentJson.description = ruteroApp.reserveGetDescription(reserve);
    // paymentJson.application_fee = ruteroApp.feeGetValue(reserve.total_cost);


    paymentJson.payer = this.getPayer(paymentJson.payer);
    paymentJson.additional_info = this.getAdditionalInfo(reserve, user, paymentJson);
    // paymentJson.application = mp.clientId;
    // String
    // Localización: Body
    // Descripción con la que aparecerá el pago en el resumen de tarjeta (ej. MERCADOPAGO)
    paymentJson.statement_descriptor = mp.general.statement_descriptor;
    return paymentJson;
  }
  static async paymentSend(paymentJson, companyinfo, authorization) {
    let self = this;
    if (!companyinfo) return;
    let keys = mercadopagoApp.getKeys()
    let accesstoken = companyinfo.data.product.access_token;
    const headers = {
      'Authorization': `Bearer ${accesstoken}`,
      'accept': 'application/json',
      'content-type': 'application/json',
    };

    const url = mp.payment.url;
    const body = JSON.stringify(paymentJson);
    const options = { headers };

    try {
      axios
        .post(url, body, options)
        .then((response) => {
          // console.log(JSON.stringify(response));
          if (response.status != 200 && response.status != 201) {

            self.errorGetDetails(response);
          }
          else {
            pageApp.showAlertSuccess();

          }

        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          self.errorGetDetails(error);
        })
    }
    catch (error) {
      // sentencias para manejar cualquier excepción
      self.errorGetDetails(error);

    }
  }
  static errorGetDetails(error) {
    pageApp.showAlertReject();
    // sentencias para manejar cualquier excepción
    // console.log(error); // pasa el objeto de la excepción al manejador de errores
    var error_data = error;
    last = error_data.cause.length - 1;
    var message = this.ErrorGetHandler(error_data.cause[last].code)
    // console.log("verify filled data: " + message);

    error_data.success = false;
    error_data.error = message;
    return error;
  }

  static ErrorGetHandler(code) {

    var message = '';
    switch (code) {
      case "205":
        message = "Error, el número de la TDC no puede estar vácio"
        break;

      case "208":
        message = "Error, mes de expiración no puede estar vácio"
        break;


      case "209":
        message = "Error, año de expiración no puede estar vácio"
        break;

      case "214":
        message = "Error, documento de identidad inválido"
        break;


      case "221":
        message = "Error, el nombre del tarjetahabiente no puede ser vácio"
        break;


      case "325":
        message = "Error, mes de expiración inválido"
        break;

      case "326":
        message = "Error, año de expiración inválido"
        break;


      case "E301":
        message = "Error, año de expiración inválido"
        break;

      case "E302":
        message = "Error, código de seguridad inválido"
        break;

      default:
        message = "Error en datos de la TDC"
        break;

    }

    return message;

  }

  static getExternalReference(reserveId) {
    return mp.general.external_reference + reserveId;
  }

  static getAdditionalInfo(reserve, user, paymentJson) {
    let ref = {
      "items": [
        {
          "id": reserve.id,
          "title": reserve.productName,
          "description": ruteroApp.reserveGetDescription(reserve),
          "category_id": mp.general.category_id,
          "category_descriptor": {
            "passenger": {
              "first_name": user.first_name,
              "last_name": user.last_name,
            }
          },
          "quantity": 1,
          "unit_price": reserve.total_cost
        }
      ],
      "payer": {
        "first_name": user.first_name,
        "last_name": user.last_name,

      }

    };
    return ref;
  }

  static getPayer(payer) {
    payer.entity_type = "individual";
    payer.type = "customer";
    return payer;
  }

}



export class ruteroApp {
  //FUNCIONES DE CALCULO VALIDACION Y FORMATO
  static evaluateTextInPlural(count, str) {
    if (count == 0) return "";
    return count > 1 || +count === 0 ? `${count} ${str}s` : `${count} ${str}`
  }
  static reserveGetDescription(reserve) {
    let infantes = ruteroApp.evaluateTextInPlural(reserve.kids, rutero.general.childText) != "" ? " - " + ruteroApp.evaluateTextInPlural(reserve.kids, rutero.general.childText) : "";
    let adulto = ruteroApp.evaluateTextInPlural(reserve.adults, rutero.general.adultText);
    let noche = ruteroApp.evaluateTextInPlural(reserve.nights, rutero.general.nigthText);
    return reserve.productName + " - " + adulto + infantes + " X " + noche + " desde el " + reserve.from + " hasta el " + reserve.to;
  }
  
  static feeGetValue(cost) {
    let fee = rutero.application_fee / 100;
    return Math.round(cost * fee);
  }
  static emailIsValidate(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  }


  //FUNCIONES DE OPERACIONES DE API
  static async companyUpdateFromMP(responseMP, CompanyId) {

    if (responseMP.data.access_token == null) {
      // console.log("error en response, no access token");
      return;
    }

    const headers = {
      // 'Authorization': 'Bearer ' + Authorization,
      'Content-Type': 'application/json'
    };
    const url = `${rutero.baseURL}${rutero.supplier.update}${CompanyId}`;
    const body = {
      "access_token": responseMP.data.access_token,
      "public_key": responseMP.data.public_key,
      "refresh_token": responseMP.data.refresh_token,
      "user_id": responseMP.data.user_id,
      "expires_in": responseMP.data.expires_in
    };
    const options = { headers };

    const response = axios.patch(url, body, options)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      })
  }

  static async companyGetByProduct(ProductId) {
    let authorization = pageApp.getTokenRutero();
    // console.log("autorization :" + authorization);
    if (authorization == null || null == ProductId) {
      // console.log("error en autorization ");
      return false;
    }
    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json'
    };

    const url = `${rutero.baseURL}${rutero.product.getbyId}${ProductId}`;
    const body = {};
    const options = { headers };


    try {
      let res = await axios.get(url, body, options);
      // console.log(url);
      return res.data
    }
    catch (e) {
      // sentencias para manejar cualquier excepción
      // console.log(e); // pasa el objeto de la excepción al manejador de errores
      return false;
    }
  }
  static reservationFormatJson(reserve, cart) {
    if (reserve.id != null || reserve.id != undefined) {
      let reservation = reserve;
      reservation.productName = cart.productName;
      reservation.from = cart.from;
      reservation.to = cart.to;
      reservation.totalPriceNight = cart.totalPriceNight;

      return reservation;
    }
    else return false;
  }

  static async reservationUpdateFromPreference(responseMP) {
    if (responseMP == null) {
      // console.log("error en response");
      return;
    }
    let data = responseMP.data;
    let reserve_id = data.external_reference.replace(mp.general.external_reference, '');
    const body = {

      "preference_id": data.id


    };

    return await this.reservationUpdate(body,reserve_id);
  }

  static async reservationUpdateFromMP(data, sitestatus) {
    if (data == null) {
      // console.log("error en response");
      return;
    }
    let reserve_id = data.external_reference.replace(mp.general.external_reference, '');
   
    const body = {
      "mp_payment_id": data.payment_id,
      "preference_id": data.preference_id,
      "merchant_order_id": data.merchant_order_id,
      "collection_id": data.collection_id,
      "collection_status": data.collection_status,
      "mp_status": data.status,
      "payment_type": data.payment_type,
      "sitestatus": sitestatus
    };
    return await this.reservationUpdate(body,reserve_id);
  }

  static async reservationUpdate(body,reserve_id) {
    if (body == null) {
      // console.log("error en response");
      return;
    }

    let authorization = pageApp.getTokenRutero();
  
    const headers = {
      'Authorization': 'Bearer ' + authorization,
      'Content-Type': 'application/json'
    };

    const url = `${rutero.baseURL}${rutero.product.update}${reserve_id}`;

    const options = { headers };

    try {
      let res = await axios.patch(url, body, options);
      // console.log(JSON.stringify(res));
      return res.data
    }
    catch (e) {
      // sentencias para manejar cualquier excepción
      // console.log(e); // pasa el objeto de la excepción al manejador de errores
      return false;
    }


  }
}

export class bricksApp {
  static mpBrick;
  static eventAlertSuccess = "handleAlertSuccess";
  static eventAlertReject = "handleAlertReject";
  static AlertSuccess = false;
  static AlertReject = false;

  static initApp(reserve, user, authorization) {
    // console.log(JSON.stringify(reserve));
    // console.log(JSON.stringify(user));
    let self = this;

    if (reserve != null || reserve != undefined) {
      if (!mercadopagoApp.isMercadoPago()) {
        setTimeout(function () {
          self.inicializeBrick(reserve, user, authorization);
        }, 1500);
      }
      else {
        self.inicializeBrick(reserve, user, authorization);
      }
    }
  }

  static async inicializeBrick(reserve, user, authorization) {
    let self = this;
    reserve.total_cost = mercadopagoApp.validateCost(reserve.total_cost);

    //setting for bricks
    const setting = self.settingGetJson(reserve, user, authorization);
    //init for bricks
    self.mpBrick = new MercadoPago(mercadopagoApp.getKeys().publicKey, { locale: mp.general.locale });
    const bricksBuilder = self.mpBrick.bricks();
    //load  for bricks
    // console.log(mercadopagoApp.getKeys().publicKey);
    // console.log(JSON.stringify(setting))
    const cardPaymentBrickController = await bricksBuilder.create('cardPayment', mp.bricks.containerId, setting);
  }

  static initializationGetJson(reserve, user) {
    return {
      amount: reserve.total_cost,
      payer: {
        email: user.email,
      },
    };
  }
  static customizationGetJson() {
    return {
      visual: {
        style: {
          theme: mp.bricks.theme // 'default' |'dark' | 'bootstrap' | 'flat'
        }
      },
      paymentMethods: mp.general.paymentMethods
    };

  }
  static settingGetJson(reserve, user, authorization) {
    let self = this;
    return {
      initialization: self.initializationGetJson(reserve, user),
      customization: self.customizationGetJson(),
      callbacks: {
        onReady: (cardData) => {
          // console.log("aqui ready");
          // handle form ready
          // console.log(JSON.stringify(cardData));
          // let docNumer = document.getElementsByName("DOCUMENT")[0];
          // docNumer.setAttribute("inputmode", "none");
        },
        onSubmit: (cardData) => {
          // console.log("aqui submit");
          // console.log(JSON.stringify(cardData));
          //preferenceApiApp.preferenceSave(cardData, reserve, user, authorization);
          checkoutApiApp.paymentSave(cardData, reserve, user, authorization);
        },
        onError: (error) => {
          // handle error
          // console.log(JSON.stringify(error));
        }
      }
    };

  }


}
