import axios from 'axios';
import notifier from 'node-notifier';
// import NodeMailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();


const CHECK_INTERVAL = 60000;
const WATCH_VARIANTS = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const SKU = 'IB3593';
const STATUS = {
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  IN_STOCK: 'IN_STOCK',
};


// const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
// const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// let transport = NodeMailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL_USERNAME,
//     pass: EMAIL_PASSWORD
//   }
// });

// const mailOptions = {
//   from: 'CAMISETA CAMPEÓN DISPONIBLE',
//   to: 'AQUÍ VA EL MAIL DESTINATARIO',
//   subject: 'Talle disponible',
//   text: 'A comprar: https://www.adidas.com.ar/'+SKU+'.html'
// };

function playSuperBeep(time = 0) {
  console.log('\u0007');
  setTimeout(() => {
    if (time < 7) {
      playSuperBeep(time + 1);
    }
  }, 500);
}

function matchVariants(variationList = [], watchVariants = WATCH_VARIANTS) {
  return variationList?.reduce(
    (pv, cv) => pv || !!watchVariants.find((v) => v === cv?.size),
    false
  );
}

function printVariationAvailability(variationList = []) {
  for (let index = 0; index < variationList?.length; index++) {
    const variation = variationList[index];

    if (
      (variation?.availability > 0 ||
        variation?.availability_status !== STATUS?.NOT_AVAILABLE) &&
      WATCH_VARIANTS?.includes(variation?.size)
    ) {
      notifier.notify({
            title: '¡HAY STOCK EN TALLE '+variation?.size+'!',
            message: `Se detectó stock de la casaca del campeón`,
            icon: './assets/messirve.jpg',
            appID: 'Bot camiseta AFA'
      });
      console.log('✅ VARIANTE EN STOCK ✅');
      console.log('Talle '+variation?.size);
      playSuperBeep();

      // if(variation?.size==='L') /*AQUÍ VA EL TALLE ESPECÍFICO*/ {
      //   transport.sendMail(mailOptions, function(err, info) {
      //     if (err) {
      //       console.log(err)
      //     } else {
      //       console.log(info);
      //     }
      //    });
      // }

    }
  }
}

async function checkAvailability() {
  try {
    console.log(`Checked at (${new Date().toLocaleString()})`);
    const axiosResponse = await axios.get(
      `https://www.adidas.com.ar/api/products/`+SKU+`/availability`
    );
    const responseData = axiosResponse.data;
    const variationsAvailable = responseData?.variation_list?.filter(
      (variation) => variation?.availability > 0
    );
    if (
      responseData?.availability_status !== STATUS?.NOT_AVAILABLE &&
      matchVariants(variationsAvailable)
    ) {
      console.log('✅ PRODUCTO EN STOCK ✅');
      console.log(
        '🔗 ',
        'https://www.adidas.com.ar/'+SKU+'.html'
      );
      printVariationAvailability(responseData?.variation_list);
    }
  } catch (error) {
    console.error(error);
  }
}

checkAvailability();

setInterval(async () => {
  checkAvailability();
}, CHECK_INTERVAL);