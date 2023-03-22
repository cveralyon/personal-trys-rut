
export const credentials = {
  clientId: '2058354633842917',
  clientSecret: 'uL02sDFOhj80PfofVDPTlLBS4g4BfKdc',

  prod: {
    publicKey: 'APP_USR-8dade297-4a17-4339-ba5b-0c6ebdfb9be3',
    AccessToken: 'APP_USR-2058354633842917-080413-0726d47dc0fdfef5db69ffed6521b7bc-829436795',
    notification: 'https://www.rutero.cl/notifications?mode=test'
  },
  dev: {
    publicKey: 'TEST-bcb90a37-3731-4bd1-afa4-f8d4f900e199',
    AccessToken: 'TEST-4681371288796902-022219-2ce0aee270b9474e4341022c613103bb-34697061',
    notification: 'https://www.rutero.cl/notifications?mode=prod'
  }
};


export default (context, inject) => {
  function instance_bricks(reservation) {
    const mp = new MercadoPago(credentials.prod.publicKey, { locale: 'es-CL' });
    const bricksBuilder = mp.bricks();
    const renderCardPaymentBrick = async (bricksBuilder) => {

      const settings = {
        initialization: {
          amount: reservation.total_cost,
          payer: {
            email: 'test_user_123@testuser.com'
            // email: this.$auth.user.email;
          },
        },
        customization: {
          paymentMethods: {
              minInstallments: 1,
              maxInstallments: 1,
          },
        },
        callbacks: {
          // Cuando carga bricks (ventana de checkout) se crea la reserva
          onReady: async () => {
            await this.$axios.$post("/api/v1/reservations",
            {
              reservation: reservation,
            },
            {
              headers: {
                Authorization: this.$auth.strategy.token.get(),
              },
            }
            )
            .then((response) => {
              this.reservation_id = response.preference_data.items[0].id
            })
            .catch((error) => {
              if (error.response.status === 422) {
                alert(
                  "Los administradores no estan habilitados para hacer reservas"
                );
                window.location.reload();
              }
            });
          },
          // Cuando se ingresa el pago, se realiza el resto del flujo de reserva
          onSubmit: (cardFormData) => {
            // callback llamado cuando el usuario haga clic en el botón enviar los datos
            console.log(cardFormData)
            console.log(reservation)
            
            // ejemplo de envío de los datos recolectados por el Brick a su servidor
            return new Promise((resolve, reject) => {
              this.$axios.$post(
                `/api/v1/reservations/save_payment_bricks/${this.reservation_id}`,
                cardFormData,
                {
                  headers: {
                    Authorization: this.$auth.strategy.token.get(),
                  },
                }
              )
              .then((response) => {
                console.log(response)
                resolve();
              })
              .catch((error) => {
                reject();
                if (error.response.status === 422) {
                  alert(
                    "Los administradores no estan habilitados para hacer reservas"
                  );
                  window.location.reload();
                }
              });
            });
          },
          onError: (error) => { 
            alert(
              "Ha ocurrido un error al cargar MercadoPago. Por favor intentar en otro momento."
            );
            // callback llamado para todos los casos de error de Brick
          },
        },
      };
      const cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    };
    renderCardPaymentBrick(bricksBuilder);
  }

  function instance_paymentbricks(reservation) {
    const mp = new MercadoPago(credentials.prod.publicKey, { locale: 'es-CL' });
    const bricksBuilder = mp.bricks();
    const renderPaymentBrick = async (bricksBuilder) => {
      const settings = {
        initialization: {
          amount: reservation.total_cost,
          payer: {
            // email: 'test_user_123@testuser.com'
            email: this.$auth.user.email
          },
        },
        customization: {
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            maxInstallments: 3,
          },
        },
        callbacks: {
          onReady: async () => {
            await this.$axios.$post("/api/v1/reservations",
            {
              reservation: reservation,
            },
            {
              headers: {
                Authorization: this.$auth.strategy.token.get(),
              },
            }
            )
            .then((response) => {
              this.reservation_id = response.preference_data.items[0].id
            })
            .catch((error) => {
              if (error.response.status === 422) {
                alert(
                  "Los administradores no estan habilitados para hacer reservas"
                );
                window.location.reload();
              }
            });
          },
          onSubmit: ({ selectedPaymentMethod, formData }) => {
            // callback llamado cuando el usuario haz clic en el botón enviar los datos
            console.log(selectedPaymentMethod)
            formData.selectedmethod = selectedPaymentMethod
            console.log(formData)

            return new Promise((resolve, reject) => {
              this.$axios.$post(
                `/api/v1/reservations/save_payment_bricks/${this.reservation_id}`,
                formData,
                {
                  headers: {
                    Authorization: this.$auth.strategy.token.get(),
                  },
                }
              )
              .then((response) => {
                console.log(response)
                resolve();
              })
              .catch((error) => {
                reject();
                if (error.response.status === 422) {
                  alert(
                    "Los administradores no estan habilitados para hacer reservas"
                  );
                  window.location.reload();
                }
              });
            });
          },
          onError: (error) => {
            // callback llamado para todos los casos de error de Brick
          },
        },
      };
      window.paymentBrickController = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        settings
      );
     };
     renderPaymentBrick(bricksBuilder);
  }
  
  inject('instancePaymentBricks', instance_paymentbricks)
  // inject('instanceBricks', instance_bricks)
}

// {"token":"4d50c0031148f6965cf289fb0ef3a1fd","issuer_id":"12500","payment_method_id":"visa","transaction_amount":100,"installments":1,"payer":{"email":"acpopper@uc.cl","identification":{"type":"RUT","number":"19401080k"}}}
// token 25/10 3:38pm "3e49bd5acd872d0f6a150948830c8781"