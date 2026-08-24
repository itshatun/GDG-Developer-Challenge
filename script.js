let language = "ar";
let currentChallenge = null;
let currentChallengeKey = null;
let currentAnswer = null;
let selectedOrder = [];

const $ = (id) => document.getElementById(id);

const languageBtn = $("languageBtn");
const startBtn = $("startBtn");
const solveBtn = $("solveBtn");
const testBuildBtn = $("testBuildBtn");
const nextChallengeBtn = $("nextChallengeBtn");
const backToChallengesBtn = $("backToChallengesBtn");
const homeBtn = $("homeBtn");


/* =========================================================
   CHALLENGES
========================================================= */

const challenges = {

    debug: {
        type: "code",

        ar: {
            category: "اكتشاف الأخطاء 🐛",
            eyebrow: "اكتشفي المشكلة",
            title: "أي سطر يسبب الخطأ؟",
            scenario: "صفحة تسجيل الدخول لا تعمل عند الضغط على الزر. حددي السطر الذي يحتوي على المشكلة.",
            hint: "اختاري سطرًا واحدًا فقط.",
            skill: "تصحيح الأخطاء",
            problem: "خطأ في استدعاء الدالة عند الضغط على زر تسجيل الدخول.",
            fix: "تحديد السطر الخاطئ وفهم سبب توقف التنفيذ.",

            lines: [
                "const button = document.querySelector('#login');",
                "button.addEventListener('click', handleLogin);",
                "function handleLogin() {",
                "    const user = document.querySelector('#username').value;",
                "    console.log(user.name);",
                "}"
            ],

            correct: 4
        },

        en: {
            category: "DEBUGGING 🐛",
            eyebrow: "FIND THE BUG",
            title: "Which line causes the error?",
            scenario: "The login page stops working after clicking the button. Select the line containing the bug.",
            hint: "Choose one line.",
            skill: "Debugging",
            problem: "A runtime error occurs because the code accesses a property that does not exist.",
            fix: "Identify the faulty line and understand why execution stops.",

            lines: [
                "const button = document.querySelector('#login');",
                "button.addEventListener('click', handleLogin);",
                "function handleLogin() {",
                "    const user = document.querySelector('#username').value;",
                "    console.log(user.name);",
                "}"
            ],

            correct: 4
        }
    },


    security: {
        type: "choice",

        ar: {
            category: "الأمن السيبراني 🔐",
            eyebrow: "اتخذي القرار",
            title: "أي خيار أكثر أمانًا؟",
            scenario: "لديكِ نموذج تسجيل دخول. ما الممارسة التي يجب اعتمادها لحماية كلمات المرور؟",
            hint: "اختاري أفضل ممارسة أمنية.",
            skill: "الأمن السيبراني",
            problem: "تخزين كلمات المرور بطريقة غير آمنة.",
            fix: "استخدام تجزئة آمنة مع Salt وعدم تخزين كلمات المرور كنص صريح.",

            options: [
                "تخزين كلمة المرور كما أدخلها المستخدم",
                "تجزئة كلمة المرور باستخدام خوارزمية مناسبة مع Salt",
                "إرسال كلمة المرور في رابط URL",
                "وضع كلمة المرور داخل JavaScript في الواجهة"
            ],

            correct: 1
        },

        en: {
            category: "CYBERSECURITY 🔐",
            eyebrow: "MAKE THE DECISION",
            title: "Which option is safer?",
            scenario: "You are building a login system. Which practice should be used to protect passwords?",
            hint: "Choose the best security practice.",
            skill: "Cybersecurity",
            problem: "Passwords are being stored insecurely.",
            fix: "Use secure password hashing with a unique salt and never store plaintext passwords.",

            options: [
                "Store the password exactly as entered",
                "Hash the password with a suitable algorithm and salt",
                "Send the password inside the URL",
                "Put the password inside frontend JavaScript"
            ],

            correct: 1
        }
    },


    ai: {
        type: "choice",

        ar: {
            category: "الذكاء الاصطناعي 🤖",
            eyebrow: "شخّصي النموذج",
            title: "لماذا أعطى النموذج نتيجة غريبة؟",
            scenario: "النموذج ممتاز على بيانات التدريب لكنه ضعيف جدًا على بيانات جديدة. ما السبب الأكثر احتمالًا؟",
            hint: "فكري في الفرق بين أداء النموذج على التدريب والبيانات الجديدة.",
            skill: "فهم نماذج الذكاء الاصطناعي",
            problem: "النموذج حفظ بيانات التدريب أكثر من اللازم.",
            fix: "تقليل فرط التعلّم باستخدام تقنيات مثل التحقق المتقاطع أو Regularization أو بيانات أكثر تنوعًا.",

            options: [
                "فرط التعلّم Overfitting",
                "اختفاء الإنترنت",
                "ارتفاع دقة الشاشة",
                "تغيير اسم النموذج"
            ],

            correct: 0
        },

        en: {
            category: "ARTIFICIAL INTELLIGENCE 🤖",
            eyebrow: "DIAGNOSE THE MODEL",
            title: "Why is the model giving strange results?",
            scenario: "The model performs very well on training data but poorly on new data. What is the most likely cause?",
            hint: "Think about the gap between training performance and unseen data.",
            skill: "AI Model Reasoning",
            problem: "The model memorized the training data too closely.",
            fix: "Reduce overfitting using methods such as cross-validation, regularization, or more diverse data.",

            options: [
                "Overfitting",
                "The internet is offline",
                "The screen resolution changed",
                "The model name changed"
            ],

            correct: 0
        }
    },


    performance: {
        type: "choice",

        ar: {
            category: "تحسين الأداء ⚡",
            eyebrow: "حسّني الأداء",
            title: "ما التغيير الأفضل؟",
            scenario: "صفحة المنتجات أصبحت بطيئة لأن التطبيق يطلب البيانات نفسها مرارًا. ما الحل الأنسب؟",
            hint: "اختاري حلًا يقلل العمل المتكرر.",
            skill: "تحسين الأداء",
            problem: "تكرار طلب البيانات نفسها دون حاجة.",
            fix: "استخدام التخزين المؤقت Cache وإعادة استخدام البيانات عند الحاجة.",

            options: [
                "إضافة صور أكبر حجمًا",
                "إرسال الطلب نفسه عشر مرات",
                "استخدام Cache للبيانات التي لا تتغير باستمرار",
                "زيادة عدد الأزرار في الصفحة"
            ],

            correct: 2
        },

        en: {
            category: "PERFORMANCE ⚡",
            eyebrow: "OPTIMIZE THE APP",
            title: "Which change is best?",
            scenario: "A product page became slow because the app repeatedly requests the same data. What is the best improvement?",
            hint: "Choose the option that reduces repeated work.",
            skill: "Performance Optimization",
            problem: "The application repeatedly fetches unchanged data.",
            fix: "Use caching so reusable data does not need to be fetched again and again.",

            options: [
                "Add larger images",
                "Send the same request ten times",
                "Cache data that does not change frequently",
                "Add more buttons to the page"
            ],

            correct: 2
        }
    },


    ux: {
        type: "choice",

        ar: {
            category: "تجربة المستخدم 📱",
            eyebrow: "أصلحي التجربة",
            title: "ما المشكلة في الواجهة؟",
            scenario: "المستخدم يضغط على زر الدفع ولا يحدث شيء، ولا توجد رسالة توضّح هل تم إرسال الطلب أم لا.",
            hint: "اختاري التغيير الذي يعطي المستخدم ملاحظات واضحة.",
            skill: "تصميم تجربة المستخدم",
            problem: "غياب حالة واضحة أثناء تنفيذ عملية الدفع.",
            fix: "إظهار حالة التحميل ثم رسالة نجاح أو خطأ واضحة للمستخدم.",

            options: [
                "إخفاء الزر بعد الضغط دون توضيح",
                "إضافة مؤشر تحميل ورسالة نجاح أو خطأ",
                "إزالة الزر بالكامل",
                "تغيير لون الخلفية فقط"
            ],

            correct: 1
        },

        en: {
            category: "USER EXPERIENCE 📱",
            eyebrow: "FIX THE EXPERIENCE",
            title: "What is wrong with the interface?",
            scenario: "A user clicks Pay and nothing appears to happen. There is no feedback showing whether the request was sent.",
            hint: "Choose the change that gives the user clear feedback.",
            skill: "UX Design",
            problem: "The interface does not communicate the payment state.",
            fix: "Show a loading state followed by a clear success or error message.",

            options: [
                "Hide the button after clicking without explanation",
                "Add a loading state and a clear success or error message",
                "Remove the button",
                "Only change the background color"
            ],

            correct: 1
        }
    },


    /* =====================================================
       CLOUD = DRAG & DROP
    ===================================================== */

    cloud: {
        type: "order",

        ar: {
            category: "الحوسبة السحابية ☁️",
            eyebrow: "ابني المسار",
            title: "رتّبي رحلة رفع الملف",
            scenario: "اسحبي العناصر ورتّبيها من جهاز المستخدم حتى التخزين السحابي.",
            hint: "ابدئي باختيار الملف وانتهي بالتخزين السحابي.",
            skill: "تصميم تدفق الأنظمة السحابية",
            problem: "ترتيب خطوات رفع الملف غير صحيح.",
            fix: "اختيار الملف → التطبيق → إرسال طلب الرفع → التخزين السحابي.",

            items: [
                "📁 اختيار الملف",
                "📱 التطبيق",
                "⬆️ إرسال طلب الرفع",
                "☁️ التخزين السحابي"
            ],

            correct: [0, 1, 2, 3]
        },

        en: {
            category: "CLOUD COMPUTING ☁️",
            eyebrow: "BUILD THE FLOW",
            title: "Arrange the upload journey",
            scenario: "Drag the items and arrange them from the user's device to cloud storage.",
            hint: "Start by choosing the file and finish with cloud storage.",
            skill: "Cloud System Flow",
            problem: "The upload sequence is incorrect.",
            fix: "Choose file → application → upload request → cloud storage.",

            items: [
                "📁 Choose File",
                "📱 Application",
                "⬆️ Send Upload Request",
                "☁️ Cloud Storage"
            ],

            correct: [0, 1, 2, 3]
        }
    }
};


/* =========================================================
   HELPERS
========================================================= */

function setText(id, value){

    const el = $(id);

    if(el){
        el.textContent = value;
    }
}


function showScreen(id){

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = $(id);

    if(target){
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   LANGUAGE
========================================================= */

function updateLanguageUI(){

    document.documentElement.lang = language;
    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";

    setText(
        "languageBtn",
        language === "ar" ? "EN" : "عربي"
    );

    setText(
        "challengeLabel",
        language === "ar"
            ? "تحدّي المطوّرين"
            : "DEVELOPER CHALLENGE"
    );

    setText(
        "missingText",
        language === "ar"
            ? "شيء ما مفقود."
            : "SOMETHING IS MISSING."
    );

    setText(
        "homeTitle",
        language === "ar"
            ? "هل يمكنك بناء\nما يأتي بعد ذلك؟"
            : "Can you build\nwhat comes next?"
    );

    setText(
        "homeDescription",
        language === "ar"
            ? "اكتشفي الجزء المفقود.\nفكّري كمطوّرة وابني الحل."
            : "Find the missing piece.\nThink like a developer. Build the solution."
    );

    setText(
        "startBtn",
        language === "ar"
            ? "ابدئي التحدّي ←"
            : "START CHALLENGE →"
    );

    setText(
        "flowThink",
        language === "ar" ? "فكّري" : "THINK"
    );

    setText(
        "flowDebug",
        language === "ar" ? "حلّلي" : "DEBUG"
    );

    setText(
        "flowBuild",
        language === "ar" ? "ابني" : "BUILD"
    );

    setText(
        "flowLaunch",
        language === "ar" ? "أطلقي" : "LAUNCH"
    );

    setText(
        "stepOne",
        language === "ar" ? "الخطوة 01" : "STEP 01"
    );

    setText(
        "chooseMission",
        language === "ar"
            ? "اختاري التحدّي"
            : "CHOOSE YOUR CHALLENGE"
    );

    setText(
        "pickChallenge",
        language === "ar"
            ? "اختاري مهمتك"
            : "PICK YOUR MISSION"
    );

   setText("challengeTitle", language === "ar" ? "ما الذي تريدين حله؟" : "What do you want to solve?");

    setText(
        "challengeDescription",
        language === "ar"
            ? "كل تحدٍّ يختبر مهارة مختلفة. اختاري تحديًا واكتشفي الجزء المفقود."
            : "Every challenge tests a different skill. Choose one and find the missing piece."
    );

    document
        .querySelectorAll("[data-ar][data-en]")
        .forEach(el => {

            el.textContent =
                language === "ar"
                    ? el.dataset.ar
                    : el.dataset.en;

        });

    setText(
        "challengeStep",
        language === "ar" ? "الخطوة 02" : "STEP 02"
    );

    setText(
        "buildStepTitle",
        language === "ar"
            ? "تثبيت الحل"
            : "CONFIRM THE FIX"
    );

    setText(
        "completeLabel",
        language === "ar"
            ? "اكتمل التحدّي"
            : "CHALLENGE COMPLETE"
    );

    setText(
        "resultProblemLabel",
        language === "ar" ? "المشكلة" : "PROBLEM"
    );

    setText(
        "resultFixLabel",
        language === "ar" ? "الحل" : "YOUR FIX"
    );

    setText(
        "resultSkillLabel",
        language === "ar" ? "المهارة" : "DEVELOPER SKILL"
    );

    setText(
        "finalMessage",
        language === "ar"
            ? "الآن ابنِي ما يأتي بعد ذلك."
            : "NOW BUILD WHAT'S NEXT."
    );

    setText(
        "nextChallengeBtn",
        language === "ar"
            ? "تحدٍّ آخر ↻"
            : "TRY ANOTHER CHALLENGE ↻"
    );

    setText(
        "homeBtn",
        language === "ar"
            ? "البداية"
            : "HOME"
    );

    setText(
        "backToChallengesBtn",
        language === "ar"
            ? "← العودة إلى التحديات"
            : "← BACK TO CHALLENGES"
    );

    if(currentChallenge){
        renderCurrentChallenge();
    }
}


/* =========================================================
   RENDER CHALLENGE
========================================================= */

function renderCurrentChallenge(){

    const data = currentChallenge[language];

    setText("challengeType", data.category);
    setText("challengeEyebrow", data.eyebrow);
    setText("challengeQuestion", data.title);
    setText("challengeScenario", data.scenario);
    setText("challengeHint", data.hint);

    setText(
        "solveBtn",
        language === "ar"
            ? "تحققي من الحل ←"
            : "CHECK ANSWER →"
    );

    const workspace = $("workspace");

    workspace.innerHTML = "";

    currentAnswer = null;
    selectedOrder = [];

    if(currentChallenge.type === "choice"){
        renderChoice(data, workspace);
    }

    if(currentChallenge.type === "code"){
        renderCode(data, workspace);
    }

    if(currentChallenge.type === "order"){
        renderOrder(data, workspace);
    }
}


/* =========================================================
   CHOICE
========================================================= */

function renderChoice(data, workspace){

    const grid = document.createElement("div");

    grid.className = "choice-grid";

    data.options.forEach((option, index) => {

        const card = document.createElement("button");

        card.type = "button";
        card.className = "choice-card";

        const num = document.createElement("span");

        num.className = "choice-number";
        num.textContent = index + 1;

        const text = document.createElement("span");

        text.className = "choice-text";
        text.textContent = option;

        const mark = document.createElement("span");

        mark.className = "choice-mark";
        mark.textContent = "";

        card.append(num, text, mark);

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".choice-card")
                .forEach(c => {

                    c.classList.remove(
                        "selected",
                        "wrong",
                        "correct"
                    );

                    const m = c.querySelector(".choice-mark");

                    if(m){
                        m.textContent = "";
                    }

                });

            card.classList.add("selected");

            mark.textContent = "✓";

            currentAnswer = index;

        });

        grid.appendChild(card);

    });

    workspace.appendChild(grid);
}


/* =========================================================
   CODE
========================================================= */

function renderCode(data, workspace){

    const box = document.createElement("div");

    box.className = "code-box";

    data.lines.forEach((line, index) => {

        const row = document.createElement("span");

        row.className = "code-line clickable";

        row.textContent = `${index + 1}  ${line}`;

        row.addEventListener("click", () => {

            document
                .querySelectorAll(".code-line")
                .forEach(x => {

                    x.classList.remove(
                        "selected",
                        "wrong",
                        "correct"
                    );

                });

            row.classList.add("selected");

            currentAnswer = index;

        });

        box.appendChild(row);

    });

    workspace.appendChild(box);
}


/* =========================================================
   DRAG & DROP ORDER
========================================================= */

function renderOrder(data, workspace){

    const wrap = document.createElement("div");

    wrap.className = "order-builder";


    /* ---------- AVAILABLE ---------- */

    const source = document.createElement("div");

    source.className = "order-panel";


    const sourceTitle = document.createElement("h3");

    sourceTitle.textContent =
        language === "ar"
            ? "العناصر المتاحة"
            : "AVAILABLE ITEMS";

    source.appendChild(sourceTitle);


    const list = document.createElement("div");

    list.className = "order-list";
    list.id = "availableItems";


    /* ---------- YOUR ORDER ---------- */

    const destination = document.createElement("div");

    destination.className = "order-panel";


    const destinationTitle = document.createElement("h3");

    destinationTitle.textContent =
        language === "ar"
            ? "ترتيبك"
            : "YOUR ORDER";

    destination.appendChild(destinationTitle);


    const selected = document.createElement("div");

    selected.className = "selected-order";
    selected.id = "selectedItems";


    /* ---------- CREATE ITEMS ---------- */

    data.items.forEach((item, index) => {

        const el = createDragItem(
            item,
            index,
            data
        );

        list.appendChild(el);

    });


    /* ---------- DROP EVENTS ---------- */

    setupDropZone(
        list,
        "available"
    );

    setupDropZone(
        selected,
        "selected"
    );


    source.appendChild(list);

    destination.appendChild(selected);

    wrap.append(source, destination);

    workspace.appendChild(wrap);

    updateOrderState();
}


/* =========================================================
   CREATE DRAG ITEM
========================================================= */

function createDragItem(item, index, data){

    const el = document.createElement("button");

    el.type = "button";

    el.className = "order-item";

    el.draggable = true;

    el.dataset.itemId = index;

    el.textContent = item;


    /* CLICK = MOVE ITEM */

    el.addEventListener("click", () => {

        if(
            el.parentElement &&
            el.parentElement.id === "availableItems"
        ){

            moveToSelected(index);

        }else{

            moveToAvailable(index);

        }

    });


    /* DRAG START */

    el.addEventListener("dragstart", event => {

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData(
            "text/plain",
            String(index)
        );

        el.classList.add("dragging");

    });


    /* DRAG END */

    el.addEventListener("dragend", () => {

        el.classList.remove("dragging");

    });


    /* ALLOW REORDERING */

    el.addEventListener("dragover", event => {

        event.preventDefault();

        const container = el.parentElement;

        if(!container) return;

        const dragging =
            container.querySelector(".dragging");

        if(!dragging || dragging === el) return;

        const rect = el.getBoundingClientRect();

        const after =
            event.clientY >
            rect.top + rect.height / 2;

        if(after){

            el.after(dragging);

        }else{

            el.before(dragging);

        }

    });


    /* DROP ON ITEM */

    el.addEventListener("drop", event => {

        event.preventDefault();

        const id =
            Number(
                event.dataTransfer.getData("text/plain")
            );

        if(Number.isNaN(id)) return;

        updateOrderState();

    });


    return el;
}


/* =========================================================
   DROP ZONES
========================================================= */

function setupDropZone(zone, type){

    zone.addEventListener("dragover", event => {

        event.preventDefault();

        zone.classList.add("drag-over");

        event.dataTransfer.dropEffect = "move";

    });


    zone.addEventListener("dragleave", () => {

        zone.classList.remove("drag-over");

    });


    zone.addEventListener("drop", event => {

        event.preventDefault();

        zone.classList.remove("drag-over");

        const id =
            Number(
                event.dataTransfer.getData("text/plain")
            );

        if(Number.isNaN(id)) return;

        const item =
            document.querySelector(
                `.order-item[data-item-id="${id}"].dragging`
            );

        if(!item) return;


        if(type === "available"){

            zone.appendChild(item);

        }else{

            zone.appendChild(item);

        }

        updateOrderState();

    });

}


/* =========================================================
   MOVE TO SELECTED
========================================================= */

function moveToSelected(id){

    const selected = $("selectedItems");
    const available = $("availableItems");

    if(!selected || !available) return;

    const item =
        available.querySelector(
            `.order-item[data-item-id="${id}"]`
        );

    if(!item) return;

    selected.appendChild(item);

    updateOrderState();
}


/* =========================================================
   MOVE BACK TO AVAILABLE
========================================================= */

function moveToAvailable(id){

    const selected = $("selectedItems");
    const available = $("availableItems");

    if(!selected || !available) return;

    const item =
        selected.querySelector(
            `.order-item[data-item-id="${id}"]`
        );

    if(!item) return;

    available.appendChild(item);

    updateOrderState();
}


/* =========================================================
   UPDATE ORDER
========================================================= */

function updateOrderState(){

    const selected = $("selectedItems");

    if(!selected){

        selectedOrder = [];

        currentAnswer = null;

        return;
    }

    const items =
        [...selected.querySelectorAll(".order-item")];

    selectedOrder =
        items.map(item =>
            Number(item.dataset.itemId)
        );

    items.forEach((item, index) => {

        item.dataset.index = index + 1;

    });

    currentAnswer =
        selectedOrder.length
            ? [...selectedOrder]
            : null;
}


/* =========================================================
   RESET CURRENT ANSWER
========================================================= */

function resetCurrentAnswer(){

    currentAnswer = null;
    selectedOrder = [];


    /* RESET CHOICE */

    document
        .querySelectorAll(".choice-card")
        .forEach(card => {

            card.classList.remove(
                "selected",
                "wrong",
                "correct"
            );

            const mark =
                card.querySelector(".choice-mark");

            if(mark){
                mark.textContent = "";
            }

        });


    /* RESET CODE */

    document
        .querySelectorAll(".code-line")
        .forEach(line => {

            line.classList.remove(
                "selected",
                "wrong",
                "correct"
            );

        });


    /* RESET DRAG & DROP */

    if(currentChallenge &&
       currentChallenge.type === "order"){

        const data =
            currentChallenge[language];

        const available =
            $("availableItems");

        const selected =
            $("selectedItems");

        if(available && selected){

            selected
                .querySelectorAll(".order-item")
                .forEach(item => {

                    available.appendChild(item);

                });

        }

    }


    const feedback =
        $("workspace")?.querySelector(".feedback");

    if(feedback){
        feedback.remove();
    }

    updateOrderState();
}


/* =========================================================
   FEEDBACK
========================================================= */

function showFeedback(message, success){

    let feedback =
        $("workspace").querySelector(".feedback");

    if(!feedback){

        feedback =
            document.createElement("div");

        feedback.className = "feedback";

        $("workspace").appendChild(feedback);

    }

    feedback.textContent = message;

    feedback.className =
        "feedback " +
        (success ? "success" : "error");
}


/* =========================================================
   CHECK CHALLENGE
========================================================= */

function checkChallenge(){

    if(!currentChallenge) return;

    const data =
        currentChallenge[language];


    /* ---------- ORDER ---------- */

    if(currentChallenge.type === "order"){

        updateOrderState();

        if(
            !Array.isArray(currentAnswer) ||
            currentAnswer.length !== data.correct.length
        ){

            showFeedback(
                language === "ar"
                    ? "رتّبي جميع العناصر أولًا."
                    : "Arrange all items first.",
                false
            );

            return;
        }


        const correct =
            currentAnswer.every(
                (value, index) =>
                    value === data.correct[index]
            );


        if(correct){

            completeChallenge(data);

        }else{

            /*
             * إذا كان الحل خطأ:
             * نمسح الترتيب كاملًا
             */

            showFeedback(
                language === "ar"
                    ? "الترتيب غير صحيح. تم مسح إجابتك، حاولي مرة أخرى."
                    : "The order is incorrect. Your answer has been cleared. Try again.",
                false
            );

            setTimeout(() => {

                resetCurrentAnswer();

            }, 700);

        }

        return;
    }


    /* ---------- NO ANSWER ---------- */

    if(currentAnswer === null){

        showFeedback(
            language === "ar"
                ? "اختاري إجابة أولًا."
                : "Choose an answer first.",
            false
        );

        return;
    }


    /* ---------- NORMAL CHALLENGES ---------- */

    const correct =
        currentAnswer === data.correct;


    if(correct){

        if(currentChallenge.type === "code"){

            document
                .querySelectorAll(".code-line")
                [currentAnswer]
                ?.classList.add("correct");

        }else{

            document
                .querySelectorAll(".choice-card")
                [currentAnswer]
                ?.classList.add("correct");

        }

        completeChallenge(data);

    }else{

        if(currentChallenge.type === "code"){

            document
                .querySelectorAll(".code-line")
                [currentAnswer]
                ?.classList.add("wrong");

        }else{

            document
                .querySelectorAll(".choice-card")
                [currentAnswer]
                ?.classList.add("wrong");

        }


        showFeedback(
            language === "ar"
                ? "إجابة غير صحيحة. تم مسح إجابتك، حاولي مرة أخرى."
                : "Incorrect answer. Your answer has been cleared. Try again.",
            false
        );


        /*
         * يمسح الإجابة بعد ظهور الرسالة
         */

        setTimeout(() => {

            resetCurrentAnswer();

        }, 700);

    }

}


/* =========================================================
   COMPLETE
========================================================= */

function completeChallenge(data){

    showScreen("build");

    setText(
        "buildTitle",
        language === "ar"
            ? "ثبّتي الحل."
            : "CONFIRM YOUR FIX."
    );

    setText(
        "buildDescription",
        language === "ar"
            ? "راجعي اختيارك. عندما تكونين جاهزة، أكدي الحل للانتقال إلى النتيجة."
            : "Review your answer. When you're ready, confirm the fix to see your result."
    );


    const box =
        $("builderWorkspace");

    box.innerHTML = "";


    const card =
        document.createElement("div");

    card.className = "review-card";


    const title =
        document.createElement("div");

    title.className = "review-title";

    title.textContent =
        language === "ar"
            ? "مراجعة الحل"
            : "SOLUTION REVIEW";


    const answer =
        document.createElement("div");

    answer.className = "review-answer";


    let answerText = "";


    if(currentChallenge.type === "code"){

        answerText =
            language === "ar"
                ? `السطر ${currentAnswer + 1}`
                : `Line ${currentAnswer + 1}`;

    }else if(currentChallenge.type === "choice"){

        answerText =
            data.options[currentAnswer];

    }else{

        answerText =
            currentAnswer
                .map(index => data.items[index])
                .join(" → ");

    }


    answer.textContent = answerText;

    card.append(title, answer);

    box.appendChild(card);


    currentAnswer = {
        answer: answerText,
        data: data
    };
}


/* =========================================================
   FINISH
========================================================= */

function finishBuild(){

    if(
        !currentChallenge ||
        !currentAnswer ||
        !currentAnswer.data
    ){
        return;
    }

    const data =
        currentAnswer.data;


    setText(
        "resultTitle",
        language === "ar"
            ? "وجدتِ الجزء المفقود. 🚀"
            : "YOU FOUND THE MISSING PIECE. 🚀"
    );

    setText(
        "resultProblem",
        data.problem
    );

    setText(
        "resultFix",
        data.fix
    );

    setText(
        "resultSkill",
        data.skill
    );


    showScreen("result");
}


/* =========================================================
   START
========================================================= */

function startChallenge(){

    showScreen("challengeSelect");
}


/* =========================================================
   CHOOSE CHALLENGE
========================================================= */

function chooseChallenge(key){

    currentChallengeKey = key;

    currentChallenge =
        challenges[key];

    currentAnswer = null;
    selectedOrder = [];

    showScreen("challenge");

    renderCurrentChallenge();
}


/* =========================================================
   TRY ANOTHER
========================================================= */

function restartRandom(){

    const keys =
        Object.keys(challenges);

    const currentIndex =
        keys.indexOf(currentChallengeKey);

    let index =
        Math.floor(
            Math.random() * keys.length
        );


    if(
        keys.length > 1 &&
        index === currentIndex
    ){

        index =
            (index + 1) % keys.length;

    }


    /*
     * مهم:
     * نبدأ التحدي الجديد من الصفر
     */

    currentAnswer = null;
    selectedOrder = [];

    chooseChallenge(
        keys[index]
    );
}


/* =========================================================
   EVENTS
========================================================= */

languageBtn.addEventListener("click", () => {

    language =
        language === "ar"
            ? "en"
            : "ar";

    updateLanguageUI();

});


startBtn.addEventListener(
    "click",
    startChallenge
);


document
    .querySelectorAll(".challenge-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                chooseChallenge(
                    card.dataset.challenge
                );

            }
        );

    });


solveBtn.addEventListener(
    "click",
    checkChallenge
);


testBuildBtn.addEventListener(
    "click",
    finishBuild
);


nextChallengeBtn.addEventListener(
    "click",
    restartRandom
);


backToChallengesBtn.addEventListener(
    "click",
    () => {

        currentAnswer = null;
        selectedOrder = [];

        showScreen("challengeSelect");

    }
);


homeBtn.addEventListener(
    "click",
    () => {

        currentChallenge = null;
        currentChallengeKey = null;
        currentAnswer = null;
        selectedOrder = [];

        showScreen("home");

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateLanguageUI();