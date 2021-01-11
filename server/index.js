const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User} = require('./models/UserModel');
const {loginMsg, registerMsg, authMsg} = require('./config/msg');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const {Todos} = require('./models/TodoModel');

mongoose.connect(config.mongoURI, {})
.then(() => {console.log('DB connect success');})
.catch(() => {console.log('DB connect fail');});



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get('/',(req, res) => {
    console.log('connection incoming');
});

//auth callbackFn
const auth = (req, res, next) => {
    console.log('권한요청이 들어왔습니다.');
    console.log(req.cookies);
    const token = req.cookies.x_auth;
    if(token){
        User.findOne({token}, (err, doc) => {
            if(err) throw err;
            if(!doc) return res.json(authMsg.fail);

            next();
        });
    } else {
        return res.json({result : false});
    }
}

app.get('/api/user/auth',auth,(req,res)=>{

});

//register api
app.post('/api/users/register', (req, res) => {
    const {id, password, email} = req.body;
    const user = new User({id,password,email});
    
    User.findOne({id}, (err, doc) => {
        if(err) return res.json(registerMsg.err);
        else if (doc){
            if(doc.id === id){
                return res.json(registerMsg.alreadyExistId);
            } else if(doc.email === email) {
                return res.json(registerMsg.alreadyExistId);
            }
        } else {
            user.save((err, doc) => {
                if(err) return res.json(registerMsg.err);
                else return res.status(200).json(registerMsg.success);
            });
        }
    }).or({email});

});


//login api
app.post('/api/users/login', (req, res) => {
    const id = req.body.id,
    pwd = req.body.password;
    console.log(id, pwd);
    
    User.findOne({id}, (err, user) => {
        if(err) return res.cookie('x_auth','').json(loginMsg.err);
        else if(!user) return res.cookie('x_auth','').json(loginMsg.idNotFound);
        else if(user.password !== pwd) return res.cookie('x_auth','').json(loginMsg.passwordIncollect);
        else if(user.password === pwd){
            
            user.generateToken((err, doc)=>{
                if(err || !doc) return res.cookie('x_auth','').json(loginMsg.err);
                return res.cookie('x_auth',doc.token)
                .status(200)
                .json(loginMsg.success);
            });
        } 
    });
});


//logout
app.get('/api/users/logout', (req,res) => {
    if(req.cookies.x_auth){
        User.findOneAndUpdate(
            {token:req.cookies.x_auth},
            {token : ""},
            (err, doc) => {
                if(err) return res.cookie('x_auth','').json("");
                return res.cookie('x_auth','')
                .status(200)
                .json({result : true, msg:"로그아웃 완료"});
            });
        } else {

            return res.cookie('x_auth','').json({result : true, msg:"로그아웃 완료"});
        }
});


const uuidv4 = () => {
    function _s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      }
      return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
  }


//todo input api
app.get('/api/todos/input',auth, (req, res) => {
    const {desc, created_date = new Date(), completed = false, id = uuidv4(), due_date = null} = req.query;
    console.log({id, completed, desc, created_date, due_date});
    const todo = new Todos({id, completed, desc, created_date, due_date});

    todo.save((err, doc) => {
        if(err) return res.json({result:false,msg:'오류발생'});
        return res.status(200).json({result:true,msg:'입력완료',todo:doc});
    });
});

//todo remove api
app.get('/api/todos/delete',auth,(req, res) => {
    const {id} = req.query;
    Todos.findOneAndDelete({id}, (err, doc) => {
        if(err) return res.json({result : false, msg : '오류발생'});
        if(!doc) return res.json({result : false, msg : 'todo가 없습니다.'});
        return res.status(200).json({result : true, msg: '삭제완료',todo : doc});
    });
});

//todo modify api
app.post('/api/todos/modify', auth, (req, res) => {
    const {id, desc, completed, due_date} = req.body;
    Todos.findOneAndUpdate(
        {id},
        {desc, completed, due_date},
        (err, doc) => {
            if(err) return res.json({result : false, msg : '오류발생'});
            return res.status(200).json({result : true, msg : '수정완료',todo : doc});
        }
    )
});

//todo retrieve api
app.get('/api/todos/retrieve', (req, res) => {
    //all, complete(true/false)
    const {completed} = req.query;

    if(completed === 'all' || completed === undefined) {
        Todos.find((err, doc) => {
            if(err) return res.json({result : false, msg : '오류발생'});
            return res.status(200).json({result : true, msg : '조회완료', todos : doc});
        });
    } else {
        Todos.find((err, doc) => {
            if(err) return res.json({result : false, msg : '오류발생'});
            return res.status(200).json({result : true, msg : '조회완료', todos : doc});
        }).where({completed})
    }
});



app.listen(port, ()=>{
    console.log('server start');
});