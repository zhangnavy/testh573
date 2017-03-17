var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/waijian');

var personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    addr: String
});

var personModel = mongoose.model('person', personSchema);

var courseSchema = new mongoose.Schema({
    name: String,
    teacher: {  //_id
        type: mongoose.Schema.Types.ObjectId,  //是_id属性的类型
        ref: 'person'
    }
    //主键：唯一确定一条文档记录(_id)
    //外健：当前文档中拥有一个其他集合文档的主键(_id) _id
});

var courseModel = mongoose.model('course', courseSchema);

//创建一条course相关的文档
/*personModel.create({name: '陈超', age: 20, addr: '北京'}, function (err, personInfo) {
    if (!err){
        console.log(personInfo);
        courseModel.create({name: 'angular', teacher: personInfo._id}, function (err, courseInfo) {
            if (!err){
                 console.log(courseInfo);
            } else {
                console.log(err);
            }
        });
    } else {
        console.log(err);
    }
});*/

//查找angular这门课讲师的名字
/*courseModel.findOne({name: 'angular'}, function (err, courseInfo) {
    if (!err){
        /!*{ _id: 58cb425cdaaa2606ce0d7ec2,
            name: 'angular',
            teacher: { _id: 58cb425cdaaa2606ce0d7ec1,
                         name: '陈超',
                         age: 20,
                         addr: '北京',
                         __v: 0 },
            __v: 0 }*!/

        personModel.findById(courseInfo.teacher, function (err, personInfo) {
            if (!err){
               /!* { _id: 58cb425cdaaa2606ce0d7ec1,
                    name: '陈超',
                    age: 20,
                    addr: '北京',
                    __v: 0 }*!/

                console.log(personInfo);
            } else {
                console.log(err);
            }
        })
    } else {
        console.log(err);
    }
});*/

/*{ _id: 58cb425cdaaa2606ce0d7ec2,
    name: 'angular',
    teacher:
    { _id: 58cb425cdaaa2606ce0d7ec1,
        name: '陈超',
        age: 20,
        addr: '北京',
        __v: 0 },
    __v: 0 }*/

courseModel.findOne({name: 'angular'})
    .populate('teacher')
    .exec(function (err, doc) {
        if (!err){
            console.log(doc);
        } else {
            console.log(err);
        }
    });




