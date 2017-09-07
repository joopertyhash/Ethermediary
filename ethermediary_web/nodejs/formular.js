function formular(){

    app.post('/newdealtwo',function(req,res){
        var meta = req.body.meta;
        amount = req.body.amount;
        assign = 0;
        req.sanitizeBody('meta').trim();
        req.sanitizeBody('amount').trim();

        req.checkBody("meta", "Please enter the transaction purpose").isAlphanumeric();
        err1 = req.validationErrors()[0];
        if(err1){assign++}

        req.checkBody("amount", "Please enter a decimal number").isDecimal();
        err2 = req.validationErrors()[assign];
        if(err2){assign++}

      	var errors = req.validationErrors();
        let handleError = function(err){
          res.render(path.join(__dirname, 'views', 'newdealone.dust'), {
            req: req,
            error: err,
            meta: meta,
            amount: amount,
            err1: err1,
            err2: err2
          });
        };

      	if(errors){
      		handleError(errors);
      		return;
      	}
        else {
          res.render(path.join(__dirname, 'views', 'newdealtwo.dust'));
        }

    });

    app.post('/newdealdone',function(req,res){
      var buyer_adress = req.body.buyer_adress;
      buyer_email = req.body.buyer_email;
      seller_adress = req.body.seller_adress;
      seller_email = req.body.seller_email;
      refund_duration = req.body.refund_duration;
      var err1, err2, err3, err4, err5;
      var assign = 0;

      req.sanitizeBody('buyer_adress').trim();
      req.sanitizeBody('buyer_email').trim();
      req.sanitizeBody('seller_adress').trim();
      req.sanitizeBody('seller_email').trim();
      req.sanitizeBody('refund_duration').trim();

      let pos = function(err, rang){
        if((Object.getOwnPropertyNames(req.validationErrors()).length-1) == (assign))
          { return (rang-1); } // Not my error so I dodge
        else return Object.getOwnPropertyNames(req.validationErrors()).length-2;  // It's my error
      }

      // On extrait l'erreur correspondante de l'objet retourné par req.validationErrors()
      req.checkBody("buyer_adress", "Please enter a valid public adress for the Buyer")
        .len(42);
      err1 = req.validationErrors()[pos(err1,0)];
      if(err1){assign++}

      req.checkBody("buyer_email", "Please enter a valid email for the Buyer")
        .isEmail();
      err2 = req.validationErrors()[pos(err2,1)];
      if(err2){assign++}

      req.checkBody("seller_adress", "Please enter a valid public adress for the Seller")
        .len(42);
      err3 = req.validationErrors()[pos(err3,2)];
      if(err3){assign++}

      req.checkBody("seller_email", "Please enter a valid email for the Seller")
        .isEmail();
      err4 = req.validationErrors()[pos(err4,3)];
      if(err4){assign++}

      req.checkBody("refund_duration", "Please enter a valid integer for the number of days")
        .isInt({ min: 7, max: 365 });
      err5 = req.validationErrors()[pos(err5,4)];
      if(err5){assign++}

      let handleError = function(err){
        res.render(path.join(__dirname, 'views', 'newdealtwo.dust'), {
          req: req,
          error: err,
          buyer_adress: buyer_adress,
          buyer_email: buyer_email,
          seller_adress: seller_adress,
          seller_email: seller_email,
          refund_duration: refund_duration,
          err1: err1,
          err2: err2,
          err3: err3,
          err4: err4,
          err5, err5
         });
      };

    	var errors = req.validationErrors();
    	if(errors){
    		handleError(errors);
    		return;
    	}
      else {
        res.render(path.join(__dirname, 'views', 'newdealdone.dust'));
      }
    });

    app.post('/mydeal',function(req,res){
       var deal_id = req.body.deal_id;
       res.render(path.join(__dirname, 'views', 'mydeal.dust'));
    });

}

module.exports = formular;
