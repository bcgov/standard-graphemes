// From: https://github.com/aaronbell/Salishan/blob/master/README.md

const arrayUbcStrings = [
  // Comox / Sliammon / Klahoose
  `a æ aw ay ɔ č č̓ e ɛ ə əw əy g gʸ h i ɩ ǰ k k̓ kʷ k̓ʷ kʸ k̓ʸ l l̓ ɬ ƛ ƛ̓ m m̓ n n̓ o ɔy p p̓ q q̓ qʷ q̓ʷ s š t t̓ θ tᶿ t̓ᶿ u ʊ w w̓ χ χʷ xʷ y y̓ ʔ `,
  // Sechelt
  `a ch ch̕ e h i k k̕ kw kw̕ ḵ ḵ̕ ḵw ḵw̕ l lh m n p p̕ s sh t t̕ tl̕ ts ts̕ u w x xw x̱ x̱w y ˀ ʔ `,
  // Squamish
  `7 a ao e h i k ḵ k' kw k̓w ḵw ḵwʼ l l' lh m m̓ n n̓ p p̓ s sh t t’ ts ts̓ u x̱ xw y y̓ z z̓ á é í ú`,
  // Hul'q’umi'num / Halkomelem
  `' a aa ch ch' e ee h hw i ii k kw kw' l lh m n o oo ou p p' q q' qw qw' s sh t t' th tl' ts ts' tth tth' u w x xw y `,
  // Hən̓q̓əmin̓əm̓
  `c c̓ č h k kʷ k̓ʷ l l̓ ƛ̓ ɬ m m̓ n n̓ p p̓ q q̓ qʷ q̓ʷ s š t t̓ t̓ᶿ θ w w̓ x xʷ χ χʷ y y̓ ʔ a a: e e: i i: u u: ǝ ay ey ey̓ ǝy ǝy̓ aw̓ a:w̓ ew iw iw̓ ǝw ǝw̓`,
  // Halq'eméylem
  `í é á ú ó ō m ch ch' p p' ' k k' kw kw' y w q q' qw qw' t t' ts ts' th th' tl' l h lh s sh shxw x x̱ xw x̱w ey é:y iy oy ōy uy ew iw ow ōw úw áy áw `,
  // Nooksack
  `a qw ch qw' ch' s e sh h t i t' k ts kw ts' kw' tl' l u lh w lh' x m xw n x̱ o x̱w p y p' y' q ʔ q' á í é ó ú ː `,
  // Squamish
  `a ao e i u aw ay ew ey iw iy uw uy ch ch’ h k kw k’ k̓w ḵ ḵ’ ḵw ḵw’ l lʼ lh m m̓ n n̓ p p̓ s sh t t’ tl’ ts ts’ w w̓ xw x̱ x̱w y y̓ 7`,
  // Straights Salish (Saanich)
  `A Á Ⱥ B C Ć Ȼ D E H I Í J K ₭ Ḵ Ḱ L Ƚ M N Ṉ O P Q S Ś T Ⱦ Ŧ Ṯ U W W̱ X X̱ Y Z s , ¸`,
  // Samish
  `a ch ch' e h i k kw kw' l lh m n ng o p p' q q' qw qw' s sh t t' tl' ts ts' u w x̲ xw x̲w y á é í ó ú`,
  // Lushootseed
  `ʔ a b c c̓ č č̓ d dᶻ ə g gʷ h i ii ǰ k k̓ kʷ k̓ʷ l l̓ ɬ ɫ ł ƛ̓ m m̓ n n̓ p p̓ q q̓ qʷ q̓ʷ s š t t̓ u w w̓ xʷ x̌ x̌ʷ y y̓ ⋯ ·`,
  // Quileute
  `a b ch c̓h d h i k k̓ kʷ k̓ʷ ḳ k̓ ḳʷ k̓ʷ l ł ɫ o p p̓ s sh t t̓ tł t̓ł ts t̓s w x xʷ x̣ x̣ʷ y ʔ a̱ g ·`,
  // S’Klallam
  `ʔ a c c̕ č č̕ e ə h i k kʷ k̕ʷ l ɬ ƛ̕ m m̕ n n̕ ŋ ŋ̕ p p̕ q q̕ qʷ q̕ʷ s š t t̕ u w w̕ xʷ x̣ x̣ʷ y y̕ á é í ú ə́ ˑ`,
  // Quinault
  `ʔ a c c̓ č č̕ ə e g g̣ h ɪ i j k k̓ ḳ ḳ̓ l l̓ ɫ ƛ̕ m n o p p̕ s š t t̕ u w W x̣ y`,
  // Haida
  `b c x d dl g G r ĝ ǥ gh h hl j k k’ kk q ḵ q q’ ḵ’ qq l l ll m m mm n n nn ng p p' r ǥ gh s t t’ tt tl tl’ ttl ts (ch) ts’ tts w x x̱ X x x̂ x̱ xh y 7 ’ ' i ii u uu e ee o oo a aa · .`,
  // Bella Coola
  `a x xʷ h i k k̓ kʷ k̓ʷ l ł m n p p̓ q q̓ qʷ q̓ʷ s t t̓ ƛ ƛ̓ c c̓ u w x̣ x̣ʷ y ʔ `,
  `a c cw h i k k' kw kw' l lh m n p p' q q' qw qw' s t t' tl tl' ts ts' u w x xw y 7`,
  // Diidiitidq (Hul’q’umi’num’ area)
  `a aa b b̓ c c̓ č čʼ d d̓ e ee h i ii k kʷ k̕ k̕ʷ l l̓ ł ƛ ƛ̕ m m̓ n n̓ o oo p p̓ q qʷ q̓ q̓ʷ s š t t̕ u uu w w̓ x xʷ x̣ x̣ʷ y y̓ ʔ ʕ `,
  // Cisaaath (Hul’q’umi’num’ area)
  `a aa c c̕ č č’ h ḥ i ii k k̕ kʷ k̕ʷ ł ƛ ƛ̕ m m̓ n n̓ p p̓ q qʷ s š t t̕ u uu w w̓ x x̣ xʷ x̣ʷ y y̓ ʕ ʔ e ee oo `,
  // Nuu-chah-nulth (Island Comox area)
  `a ʔa ʕa aa ʔaa ʕaa e ʔe ʕe ee ʔee ʕee c c̕ č č’ h ḥ i ʔi ʕi ii ʔii ʕii k k̕ kʷ k̕ʷ ł ƛ ƛ̕ m m̕ n n̕ p p̕ q qʷ s š t t̕ u ʔu ʕu uu ʔuu ʕuu w w̕ x x̣ xʷ x̣ʷ y y̕ ʕ ʔ `,
  // Ehattesaht Nuchatlaht (Island Comox area)
  `a aa c c̓ č č̓ h ḥ i ii k k̓ kʷ k̓ʷ ł ƛ ƛ̓ m m̓ n n̓ p p̓ q qʷ s š t t̓ u uu w w̓ x x̣ xʷ x̣ʷ y y̓ ʕ ʔ e ee o oo `,
  // Kwak’wala
  `a a̱ b d ḏ dł dz e g gw ǥ ǥw h i k kw k̓ k̕w ḵ ḵw ḵ̓ ḵ̕w l ł m n o p p̓ s t t̕ ts t̕s tł t̕ł u w x xw x̱ x̱w y ' `,
  // Qʷi·qʷi·diččaq (Makah)
  `ŋ ḥ m n p t c ƛ č k kʷ q qʷ ʔ p̓ t̓ c̓ ƛ̓ č̓ k̓ k̓ʷ q̓ q̓ʷ b d s ł ɫ š x xʷ x̌ x̌ʷ l y w a e i o u a· e· i· o· u· ay oy ey iy aw uy °`,
  // Shuswap
  `a á c cw e é g gw g̓w h i í k kw k̕ k̕w l ĺ ll m m̓ n n̓ o ó p p̓ q qw q̓ q̓w r r̓ s t ts ts' t̕ u ú w w̓ x xw y y̓ 7 `,
  // Lillooet (Líl̓wat)
  `a á e é i í o ó ii u ú ao aó v v́ p t ts k kw s z l m n w y h c cw lh q qw x xw g gw r 7 p̓ t̓ ts̓ k̓ k̓w q̓ q̓w z̓ ľ m̓ n̓ w̓ y̓ r̕ g̓ g̓w l̲ s̲ t̲s̲`,
  // Lillooet (Northern St̓át̓imcets)
  `a á e é i í o ii íi u ú ao áo v v́ p t ts k kw s s̲ z l m n w y h c cw lh q qw xw g gw r 7 p̓ t̓ ts̓ k̓ k̓w q̓ q̓w z̓ l̓ m̓ n̓ w̓ y̓ r̓ g̓ g̓w`,
  // Lillooet (Líl̓wat, discontinued?)
  `p t c c̣ k kʷ q qʷ ʔ p’ c’ ƛ’ k’ k’ʷ q’ q’ʷ s ṣ ɬ x xʷ x̌ x̌ʷ h m n z l ḷ y ɣ w ʕ ʕʷ m’ n’ z’ l’ ḷ’ y’ ɣ’ w’ ʕ’ ʕ’ʷ i ị u ụ ǝ ǝ̣ a ạ á ạ́ ǝ́ ǝ̣́ í ị́ ú ụ́`,
  // Thompson River Salish
  `ʔ a á c c̓ c̣ e é ə ə́ ə̣ ɣ ɣ̓ h i í ị k k̓ kʷ k̓ʷ l ḷ Ì ł ƛ̓ m m̓ n n̓ ó p p̓ q q̓ qʷ q̓ʷ s ṣ t t̓ Ɵ u ú w w̓ x xʷ x̣ x̣ʷ y y̓ z z̓ ʕ ʕ̓ ʕʷ ʕ̓ʷ l̓ l̕`,
  // Thompson River Salish (not in use?)
  `p t ts tss k kw ḵ ḵw 7 p’ t’ ts’ tl’ k’ kw’ ḵ’ ḵw’ s ss lh x xw x̱ x̱w h m n z l y g w g̱ g̱w m̓ n̓ z̓ l̕ y̓ g̓ w̓ g̱̓ g̱̓w `,
  // Coeur d’Alene
  `ɑ e ɑ̈ ê I i o ɔ u ə E ι ụ p pʼ b m mʼ ʼm w wʼ ʼw t tʼ d n nʼ ʼn s c ts ts cʼ tsʼ ts’ š sh c ǰ j dj č ch tc čʼ ch’ tc’ y yʼ ʼy ɡʷ ɡw ɡu kʷ kw k ku ko kʼʷ kʼw kʼu kʼo kʼụ xʷ khw khu kho xʷ xu q q’ qʷ qw qu qo qʼʷ q’w qʼu qʼo qʼʷ qʼu qh x̣ x̣ʷ qhw qhu qho l lʼ ʼl ɬ ł r rʼ ʼr ʕ ( ) R ʕʼ ʼ( ʼ) Rʼ ʕʷ (w (u rʷ ʕʼʷ ʼ(w uʼ( ṛʼʷ ʔ ʼ h`,
  // Columbia-Moses
  `a aa c c̓ č ə əə h ḥ ḥʷ i k k̓ kʷ k̓ʷ l l̕ ll ll̕ ł ɬ ƛ̓ m m̓ n n̓ p p̓ q q̓ qʷ q̓ʷ r r̓ š s t t̕ u uu w w̓ x xʷ x̌ x̌ʷ y y̓ ʔ ʕ ʕ̕ ʕʷ ʕ̕ʷ ‿`,
  // Colville-Okanagan (n̓səl̓xcin̓ / Nsyilxcən)
  `a c c̓ ə h i k k̓ kʷ k̓ʷ l l̓ ł ƛ̓ m m̓ n n̓ p p̓ q q̓ qʷ q̓ʷ r s t t̓ u w w̓ x x̌ xʷ x̌ʷ y y̓ ʕ ʕ̓ ʕʷ ʔ i a u ə o ‿`,
  `p t k s h m m̕ n l r w y c kʷ q qʷ ɬ x xʷ x̌ x̌ʷ p̕ t̕ c̕ k̕ k̕ʷ q̕ q̕ʷ ƛ̕ l̕ n̕ r̕ w̕ y̕ a ɣ i ə ʔ ʕ ʕ̕`,
  // Chinook Jargon
  `a ch c’h ə h i k kʰ kw kʰw k’ k’w l ɬ m n p pʰ p’ q qʰ qw qʰw q’ q’w s sh t tʰ t’ tɬ t’ɬ ts t’s u w x xw x̣ x̣w y ʔ `,
];

export const arrayUbc = arrayUbcStrings.join(" ").split(" ");
