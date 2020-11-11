module.exports.getActivationEmailBody = (link, user) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Verify Email Address</title>
       <style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    font-size: 14px;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100% !important;
    height: 100%;
    line-height: 1.6;
  }

  table td {
    vertical-align: top;
  }

  body {
    background-color: #f6f6f6;
  }

  .body-wrap {
    background-color: #f6f6f6;
    width: 100%;
  }

  .container {
    display: block !important;
    max-width: 600px !important;
    margin: 0 auto !important;
    /* makes it centered */
    clear: both !important;
  }

  .content {
    max-width: 600px;
    margin: 0 auto;
    display: block;
    padding: 20px;
  }

  .main {
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
  }

  .content-wrap {
    padding: 20px;
  }

  .content-block {
    padding: 0 0 20px;
  }

  .header {
    width: 100%;
    margin-bottom: 20px;
  }

  .footer {
    width: 100%;
    clear: both;
    color: #999;
    padding: 20px;
  }
  .footer a {
    color: #999;
  }
  .footer p, .footer a, .footer unsubscribe, .footer td {
    font-size: 12px;
  }

  h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    color: #000;
    margin: 40px 0 0;
    line-height: 1.2;
    font-weight: 400;
  }

  h1 {
    font-size: 32px;
    font-weight: 500;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 14px;
    font-weight: 600;
  }

  p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
  }
  p li, ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
  }

  a {
    color: #1ab394;
    text-decoration: underline;
  }

  .btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #1ab394;
    border: solid #1ab394;
    border-width: 5px 10px;
    line-height: 2;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    text-transform: capitalize;
  }

  .btn-red {
    text-decoration: none;
    color: #FFF;
    background-color: #ED5565;
    border: solid #ED5565;
    border-width: 5px 10px;
    line-height: 2;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    text-transform: capitalize;
  }

  .last {
    margin-bottom: 0;
  }

  .first {
    margin-top: 0;
  }

  .aligncenter {
    text-align: center;
  }

  .alignright {
    text-align: right;
  }

  .alignleft {
    text-align: left;
  }

  .clear {
    clear: both;
  }

  .alert {
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 20px;
    text-align: center;
    border-radius: 3px 3px 0 0;
  }
  .alert a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
  }
  .alert.alert-warning {
    background: #f8ac59;
  }
  .alert.alert-bad {
    background: #ed5565;
  }
  .alert.alert-good {
    background: #414EF9;
  }

  @media only screen and (max-width: 640px) {
    h1, h2, h3, h4 {
        font-weight: 600 !important;
        margin: 20px 0 5px !important;
    }

    h1 {
        font-size: 22px !important;
    }

    h2 {
        font-size: 18px !important;
    }

    h3 {
        font-size: 16px !important;
    }

    .container {
        width: 100% !important;
    }

    .content, .content-wrap {
        padding: 10px !important;
    }
  }

    .button {
      display: inline-block;
      width: 200px;
      background-color: #414EF9;
      border-radius: 3px;
      color: #ffffff;
      font-size: 15px;
      line-height: 45px;
      text-align: center;
      text-decoration: none;
      -webkit-text-size-adjust: none;
      mso-hide: all;
    }
    .button--green {
      background-color: #28DB67;
    }
    .button--red {
      background-color: #FF3665;
    }
    .button--blue {
      background-color: #414EF9;
    }

  .title{
  font-size:18px;
  color: #676a6c;
  font-weight: bold;
  margin-top: 20px;
  }

  .table-bordered > tbody > tr > td, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > td, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > thead > tr > th{
  border: 1px solid #ddd;
  }

  .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th{
  border: 1px solid #ddd;
  line-height: 1.42857;
  padding: 8px;
  vertical-align: top;
  color: #333;
  }
       </style>
      </head>
      <body>
        <table class="body-wrap">
          <tr>
            <td></td>
            <td class="container" width="600">
              <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="alert alert-good">
                    Tribal Ludo
                    </td>
                  </tr>
                  <tr>
                    <td class="content-wrap">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>

                            <h2>Hi,</h2>
                          <br>
                        </tr>
                        <tr>
                          <td class="content-block aligncenter">
                          <p>Please verify your account by clicking below link.</p><br>
                          <a style="font-weight: bold" href="${link}"  class="button button--blue">Verify Account</a>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block">
                           <p> Regards,</p>
                            <p>Team Tribal Ludo</p>
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block">

                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </body>
    </html>`;
};
