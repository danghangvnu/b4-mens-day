/* =========================================================
   DỮ LIỆU — CHỈ CẦN SỬA FILE NÀY
   Thứ tự câu hỏi = thứ tự trong danh sách members.
   ========================================================= */
const SITE = {
  title: "B4 MEN'S DAY",
  subtitle: "Những chiến thần sân cầu",
  slogan: "Trên sân là đối thủ – Ngoài sân là anh em – Trong lòng là những chiến thần cầu lông!",
  passcode: "1911",
  welcomePhoto: "images/welcome.jpg",      // ảnh hiện ra khi mở tủ
  welcomeText: "Chị em B4 chào các anh",
  passHint: "Ngày duy nhất trong năm các anh được chiều mà không phải bao nước. Ngày mấy, tháng mấy? Ghép lại thành 4 số nhé!",
  sender: "Chị em B4",
  year: 2026
};

/* Mỗi thành viên là một hồ sơ. Ảnh, tên, lời nhắn đều lấy từ cùng hồ sơ này.
   - name:     tên hiển thị khi đoán đúng và ở màn chọn ảnh
   - answers:  các đáp án được chấp nhận (họ tên, tên ngắn, biệt danh).
               Hiện mới có tên gọi — nhớ thêm họ tên và biệt danh nếu muốn tính đúng.
               Không cần ghi bản không dấu — hệ thống tự bỏ dấu, viết hoa, khoảng trắng thừa.
   - lookalike: biệt danh "giống diễn viên", hiện trên thẻ và thiệp
   - photo:    ảnh đầy đủ (dùng cho câu đố và bảng vàng)
   - chibi:    ảnh chibi, dùng trong thiệp chúc mừng
   - cropPhoto: (tùy chọn) ảnh cắt riêng. Nếu bỏ trống, web tự phóng to ảnh đầy đủ theo crop.
   - crop:     vùng phóng to { x: % ngang, y: % dọc, zoom: độ phóng }
   - hint:     gợi ý hiện sau 3 lần đoán sai. Để trống "" thì web tự gợi ý
               theo chữ cái đầu và số chữ của tên.
   - title:    danh hiệu trên thẻ cầu thủ và bằng khen
   - stats:    chỉ số chế trên thẻ (0–99)
   - award:    giải thưởng hiện ở màn chọn ảnh
   - message:  lời nhắn riêng
*/
const MEMBERS = [
  {
    name: "Hiệp",
    answers: ["Anh Hiệp", "Hiệp"],
    lookalike: "Lee Dong Wook",
    photo: "images/members/hiep.jpg",
    chibi: "images/chibi/hiep.jpg",
    crop: { x: 8.8, y: 35.0, zoom: 5 },
    hint: "",
    title: "Quý ông lịch lãm của sân cầu",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 99, "Phong độ": 95, "Độ ngầu khi đội mũ": 100 },
    award: "Thần thái đội mũ đẹp nhất hội",
    message: "Gửi Lee Dong Wook của B4! Anh Hiệp là anh cả của hội, công việc bên ngành công an bận rộn là vậy mà vẫn sắp xếp ra sân đều đặn với tụi em. Chúc anh 19/11 thật vui, công tác thuận lợi, sức khỏe dồi dào, tuần nào cũng ra sân đều với tụi em nha. Chúc anh năm nay công việc thăng tiến, mọi chuyện đều như ý!"
  },
  {
    name: "Phát",
    answers: ["Phát"],
    lookalike: "Ji Chang Wook",
    photo: "images/members/phat.jpg",
    chibi: "images/chibi/phat.jpg",
    crop: { x: 36.8, y: 12.8, zoom: 6 },
    hint: "",
    title: "Chiến binh ánh mắt biết nói",
    stats: { "Độ đẹp trai": 100, "Độ vui tính": 100, "Ánh mắt sát thương": 98, "Phát nào ăn điểm phát đó": 96 },
    award: "Đeo khẩu trang vẫn đẹp trai",
    message: "Gửi Ji Chang Wook của B4! Phát cao, đẹp trai, đánh cầu hay, tính lại hiền và tốt bụng, nói chung là đủ combo. Thêm cái hiểu chị em, rảnh là cày phim. Chúc Phát 19/11 vui vẻ, công việc suôn sẻ, phát nào ăn điểm phát đó, và sớm có bồ để có người xem phim cùng nha!"
  },
  {
    name: "Trí",
    answers: ["Trí"],
    lookalike: "Hyun Bin",
    photo: "images/members/tri.jpg",
    chibi: "images/chibi/tri.jpg",
    crop: { x: 47.5, y: 7.5, zoom: 5 },
    hint: "",
    title: "Học giả cầu lông",
    stats: { "Độ đẹp trai": 100, "Độ vui tính": 98, "Trí tuệ chiến thuật": 99, "Độ chỉn chu": 97 },
    award: "Búi tóc huyền thoại",
    message: "Gửi Hyun Bin của B4! Ấn tượng đầu tiên của chị em về Trí là: đánh cầu hay nhất nhóm, mặt hơi lạnh nhưng đẹp trai, nhìn tưởng khó gần. Chơi một thời gian mới biết Trí hòa đồng, dễ nói chuyện hơn vẻ ngoài nhiều. Chúc Trí 19/11 vui vẻ, mọi việc thuận lợi, giữ vững phong độ số một trên sân nha."
  },
  {
    name: "Huy",
    answers: ["Huy"],
    lookalike: "Lý Hiện",
    photo: "images/members/huy.jpg",
    chibi: "images/chibi/huy.jpg",
    crop: { x: 62.2, y: 70.8, zoom: 5.5 },
    hint: "",
    title: "Nụ cười tỏa nắng",
    stats: { "Độ đẹp trai": 100, "Độ vui tính": 100, "Nụ cười chữa lành": 100, "Năng lượng": 97 },
    award: "Nụ cười đẹp nhất sân",
    message: "Gửi Lý Hiện của B4! Huy hài thì khỏi bàn, mà hiền nữa, nhờ gì cũng giúp, lại còn cười rất đẹp trai. Chúc Huy 19/11 vui vẻ, khỏe mạnh, công việc thuận lợi, và Messi đá trận nào thắng trận đó để Huy còn ăn mừng nha. Năm nay chúc Huy gặp nhiều may mắn, muốn gì được nấy!"
  },
  {
    name: "Mạnh",
    answers: ["Mạnh"],
    lookalike: "Song Joong Ki",
    photo: "images/members/manh.jpg",
    chibi: "images/chibi/manh.jpg",
    crop: { x: 50.0, y: 93.8, zoom: 5 },
    hint: "",
    title: "Chàng trai năng lượng",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 99, "Sức khỏe": 98, "Độ ấm áp": 99 },
    award: "Năng lượng tích cực nhất hội",
    message: "Gửi Song Joong Ki của B4! Cảm ơn host xịn của B4 cầu lông nhé. Dưới nước là thần đồng bơi lội, trên sân thì nhiệt tình hết mình. Chúc Mạnh 19/11 vui vẻ, khỏe mạnh, công việc suôn sẻ, và lúc nào cũng tràn năng lượng như vậy nhé. Chúc Mạnh năm nay đặt sân lúc nào cũng được giờ đẹp!"
  },
  {
    name: "Thư",
    answers: ["Thư"],
    lookalike: "Cha Eun Woo",
    photo: "images/members/thu.jpg",
    chibi: "images/chibi/thu.jpg",
    crop: { x: 82.4, y: 40.4, zoom: 6 },
    hint: "",
    title: "Hoàng tử sân cầu",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 98, "Độ lãng tử": 99, "Độ điềm tĩnh": 97 },
    award: "Visual của hội",
    message: "Gửi Cha Eun Woo của B4! Nhắc tới Thư là nhắc tới Phát, hai người là cặp bạn thân nổi tiếng của hội, đi đâu cũng thấy có nhau. Chúc Thư 19/11 vui vẻ, mọi việc như ý, giữ mãi tình bạn với Phát, và mỗi lần ra sân đều thật vui nha. Chúc Thư năm nay làm gì cũng thuận, tiền vào đều đều!"
  },
  {
    name: "Việt Anh",
    answers: ["Việt Anh", "Vanh"],
    lookalike: "Lee Jong Suk",
    photo: "images/members/viet-anh.jpg",
    chibi: "images/chibi/viet-anh.jpg",
    crop: { x: 52.5, y: 55.8, zoom: 11 },
    hint: "",
    title: "Chàng thơ đeo kính",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 100, "Thời trang": 98, "Độ cool": 99 },
    award: "Gu thời trang mùa hè đỉnh nhất",
    message: "Gửi Lee Jong Suk của B4! Việt Anh hiền nhất hội luôn, chơi với nhau bao lâu rồi mà chưa thấy cáu ai bao giờ. Đánh cầu với Việt Anh lúc nào cũng thoải mái, không áp lực gì. Chúc Việt Anh 19/11 vui vẻ, khỏe mạnh, công việc thuận lợi, cứ hiền và cool như vậy là được rồi nha. Chúc Việt Anh năm nay đánh cầu lên tay, có thêm thật nhiều niềm vui mới!"
  },
  {
    name: "Đức Anh",
    answers: ["Đức Anh", "Mít"],
    lookalike: "Park Seo Joon",
    photo: "images/members/duc-anh.jpg",
    chibi: "images/chibi/duc-anh.jpg",
    crop: { x: 22.5, y: 16.2, zoom: 5 },
    hint: "",
    title: "Quý ông nháy mắt",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 100, "Độ duyên dáng": 99, "Độ tự tin": 98 },
    award: "Thánh thần thái của hội",
    message: "Gửi Park Seo Joon của B4, hay gọi thân thương là Mít! Mít hiền lành, ít nói, nhưng cả hội cần gì là có mặt. Chơi với Mít lâu mới thấy, hiền mà dễ thương cực kỳ. Chúc Mít 19/11 vui vẻ, khỏe mạnh, công việc suôn sẻ, và luôn được mọi người quý như bây giờ nha. Chúc Mít năm nay lên trình thật nhanh, trận nào cũng thắng!"
  },
  {
    name: "Hoàng Anh",
    answers: ["Hoàng Anh", "Hanh"],
    lookalike: "Tom Holland",
    photo: "images/members/hoang-anh.jpg",
    chibi: "images/chibi/hoang-anh.jpg",
    crop: { x: 61.2, y: 45.2, zoom: 6 },
    hint: "",
    title: "Người nhện của sân cầu",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 99, "Độ nhanh nhẹn": 98, "Độ chill": 100 },
    award: "Phản xạ nhanh như người nhện",
    message: "Gửi Tom Holland của B4! Hoàng Anh hơi nhạt thật, nhưng là kiểu nhạt dễ chịu: hiền, ít nói. Ra sân thì phản xạ nhanh chẳng kém người nhện. Chúc Hoàng Anh 19/11 vui vẻ, khỏe mạnh, mọi việc suôn sẻ nha. Chúc năm nay đi xe đâu cũng ngủ ngon, mà lên sân thì vẫn tỉnh như sáo nha!"
  },
  {
    name: "Dũng",
    answers: ["Dũng"],
    lookalike: "Park Bo Gum",
    photo: "images/members/dung.jpg",
    chibi: "images/chibi/dung.jpg",
    crop: { x: 48.8, y: 81.2, zoom: 6 },
    hint: "",
    title: "Chàng trai ấm áp",
    stats: { "Độ đẹp trai": 98, "Độ vui tính": 99, "Độ ấm áp": 100, "Độ dũng mãnh": 97 },
    award: "Nụ cười ấm áp nhất hội",
    message: "Gửi Park Bo Gum của B4! Dũng thủ thì khỏi phải bàn, cầu khó mấy vào tay Dũng cũng được đỡ lên. Ngoài sân thì lại hài không ai bằng, nói câu nào cả hội cười câu đó. Chúc Dũng 19/11 vui vẻ, khỏe mạnh, công việc thuận lợi, giữ vững phong độ thủ siêu hay như vậy nha. Chúc Dũng năm nay đi đâu cũng vui, chuyến đi nào cũng có ảnh đẹp!"
  }
];

/* Câu trêu khi đoán sai (chọn ngẫu nhiên, hiện dưới dòng "Sai rồi, thử lại nhé!") */
const WRONG_LINES = [
  "Đánh đôi với nhau cả năm mà không nhận ra à?",
  "Sai rồi, nhưng độ tự tin thì 10 điểm!",
  "Nhìn kỹ lại nè, người quen cả đấy!",
  "Gần đúng rồi… nếu đổi hết các chữ cái.",
  "Thôi nhìn kỹ lại đi, không ai giận đâu (chắc vậy).",
  "Lần này coi như cầu chạm lưới, đánh lại."
];

/* Khoảnh khắc B4 — dải ảnh lướt ngang ở màn cuối.
   Nên dùng ảnh ngang (tỉ lệ 4:3), mỗi ảnh dưới 500 KB. Thêm/bớt tùy ý.
   date để trống "" thì không hiện dòng ngày. */
const MOMENTS = [
  { photo: "images/moments/1.jpg", caption: "Đủ quân tại B4 Club, đứng thẳng hàng hiếm hoi", date: "" },
  { photo: "images/moments/2.jpg", caption: "Đổi môn một hôm: đội bóng áo vàng ra sân", date: "" },
  { photo: "images/moments/3.jpg", caption: "Đi bão mừng chiến thắng, giọng khàn mấy hôm", date: "" },
  { photo: "images/moments/4.jpg", caption: "Tối nay đi đâu? Đi cùng nhau là được", date: "" },
  { photo: "images/moments/5.jpg", caption: "Hai quý ông và một kệ sách", date: "" },
  { photo: "images/moments/6.jpg", caption: "Ảnh thời còn mặc đồng phục, giữ lại làm kỷ niệm", date: "" },
  { photo: "images/moments/7.jpg", caption: "Đi ăn thôi mà thần thái như chụp tạp chí", date: "" },
  { photo: "images/moments/8.jpg", caption: "Ngồi chờ cả hội ở góc phố quen", date: "" }
]

const CLOSING = {
  photo: "images/closing.jpg",          // ảnh tập thể chị em, để trống "" thì ẩn
  photoCaption: "Chị em B4 gửi các anh",
  title: "Lời kết",
  text: "Nhân ngày 19/11, chị em B4 có mấy lời muốn gửi tới các anh.\n\nCảm ơn các anh vì những buổi tối đánh cầu vui vẻ, vì lúc nào cũng nhường và kiên nhẫn chờ chị em. Mỗi người một tính, người hài, người hiền, người đánh hay, người thủ chắc, nhưng gộp lại thành một hội mà ai cũng muốn ra sân.\n\nChúc các anh 19/11 luôn mạnh khỏe, vui vẻ, công việc thuận lợi và giữ mãi đam mê với cầu lông. Mong là tụi mình còn nhiều trận cầu cháy sân, nhiều tiếng cười và thật nhiều kỷ niệm bên nhau. Hẹn gặp ở sân nha!",
  treatQuestion: "Hôm nay chị em bao, chọn 1 trong 2 nha:",
  treatOptions: ["Nước lọc ở sân 💧", "Trà đá vỉa hè 🧊"],
  treatReveal: "Đùa thôi 🤭 Ai lại bao nước lọc thật. Hẹn các anh ở sân, chị em bao thật!",
  thanksTitle: "Gửi lời cảm ơn tới chị em",
  thanksSub: "Chạm vào trái tim để thả tim cho chị em B4",
  footer: "Đã nương tay rồi đấy. Hẹn nhau trên sân 🏸"
};
