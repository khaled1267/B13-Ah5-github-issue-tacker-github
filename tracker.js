 let allIssues = [];



const loadissue = () => {

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";



    fetch(url)

        .then((res) => res.json())

        .then((data) => {

            const issuesArray = data.data || data.issues || data;



            if (Array.isArray(issuesArray)) {

                allIssues = issuesArray;

                updateTotalCount(allIssues.length, 'All');

                displayissue(allIssues);

            }

        })

        .catch(err => {

            const totalElement = document.getElementById("total-issues");

            if(totalElement) totalElement.innerText = "Error Loading Issues";

        });

};


// filter funtion 

const filterIssues = (status) => {

    let filtered;

    if (status === 'All') {

        filtered = allIssues;

    } else {

        filtered = allIssues.filter(issue =>

            issue.status.toLowerCase() === status.toLowerCase()

        );

    }

    updateTotalCount(filtered.length, status);

    displayissue(filtered);

};



// suarch funtion

const searchIssues = () => {

    const searchTerm = document.getElementById("search-input").value.toLowerCase();

    const filtered = allIssues.filter(issue =>

        issue.title.toLowerCase().includes(searchTerm)

    );

    updateTotalCount(filtered.length, 'Filtered');

    displayissue(filtered);

};



// total count 

const updateTotalCount = (count, label) => {

    const totalElement = document.getElementById("total-issues");

    if(totalElement) {

        totalElement.innerText = `${count} ${label === 'All' ? '' : label} Issues`;

    }

};



// popup funtion 

const showDetails = (issueId) => {

    const issue = allIssues.find(i => (i.id || i._id || i.title) == issueId);

    if (!issue) return;


   
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `

        <div class="p-8">

            <h2 class="text-2xl font-bold text-gray-800 mb-2">${issue.title}</h2>

            <div class="flex items-center gap-2 mb-6">

                <span class="bg-[#22C55E] text-white text-[12px] font-medium px-3 py-0.5 rounded-full uppercase">

                    ${issue.status}

                </span>

                <span class="text-gray-400 text-sm">• Opened by <span class="text-gray-600 font-medium">${issue.author || 'User'}</span> • ${issue.date || '1/15/2024'}</span>

            </div>

           

            <div class="flex gap-2 mb-6">

         <span class="bg-[#FEECEC] text-[#EF4444] text-[10px] font-bold px-3 py-1 rounded-2xl uppercase flex items-center gap-1">

                    <i class="fa-solid fa-bug text-[8px]"></i> BUG

                </span>
 <span class="bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-3 py-1 rounded-2xl border border-yellow-100 uppercase flex items-center gap-1">
  <i class="fa-solid fa-circle-question text-[8px]"></i> HELP WANTED

                </span>

            </div>



            <p class="text-gray-600">${issue.description}</p>

            

           

            <div class="bg-gray-50 rounded-xl p-6 grid grid-cols-2 gap-4">

                <div>

                    <p class="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">Assignee:</p>

                    <p class="text-sm font-bold text-gray-800">${issue.author || 'User'}</p>

                </div>

                <div>

                    <p class="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">Priority:</p>

    <span class="inline-block bg-[#EF4444] text-white text-[10px] font-bold px-4 py-1 rounded  ">

                        ${issue.priority || 'HIGH'}

                    </span>

                </div>

            </div>



            <div class="mt-8 flex justify-end">

                <button onclick="closeModal()" class="bg-[#6200EE] text-white px-10 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95">

                    Close

                </button>

            </div>

        </div>

    `;



    const modal = document.getElementById("issue-modal");

    modal.classList.remove("hidden");

    modal.classList.add("flex");

};



const closeModal = () => {

    const modal = document.getElementById("issue-modal");

    modal.classList.add("hidden");

    modal.classList.remove("flex");

};



// main card funtion

const displayissue = (issues) => {

    const issuecontainer = document.getElementById("issue-container");

    issuecontainer.innerHTML = "";



    issues.forEach((issue) => {

        const id = issue.id || issue._id || issue.title;

        let priorityStyle = "text-red-500 bg-red-50 border-red-100";

        if (issue.priority === "Medium") priorityStyle = "text-orange-500 bg-orange-50 border-orange-100";

        else if (issue.priority === "Low") priorityStyle = "text-green-500 bg-green-50 border-green-100";



        const card = document.createElement("div");

        card.className = "cursor-pointer group";

        card.onclick = () => showDetails(id);

       

        card.innerHTML = `

            <div class="border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-t-green-500' : 'border-t-purple-500'} rounded-xl p-5 h-full flex flex-col justify-between bg-[#EFEFEF] hover:bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">

                <div>

                    <div class="flex justify-between items-center mb-4">

                         <img src="${issue.status === 'open' ? './open-status.png' : './Closed-Status.png'}" class="w-8 h-8 rounded-full shadow-sm".png'">

                        <span class="text-[10px] font-bold uppercase px-2 py-1 rounded ${priorityStyle}">

                            ${issue.priority || 'High'}

                        </span>

                    </div>

                    <h3 class="font-bold text-gray-800 text-sm mb-2 group-hover:text-purple-600 transition-colors">${issue.title}</h3>

                    <p class="text-xs text-gray-500 mb-4 ">${issue.description}</p>

                </div>



                <div>

                    <div class="flex gap-2 mb-4 flex-wrap">

                        <span class="bg-[#FECACA] text-[#EF4444] text-[9px] font-bold px-2 py-1 rounded-2xl border  uppercase"> <i class="fa-solid fa-bug text-[8px]"></i>  BUG</span>

                        <span class="bg-[#FDE68A] text-[#D97706] text-[9px] font-bold px-2 py-1 rounded-2xl uppercase">  <i class="fa-solid fa-bug text-[8px]"></i>  Help wanted</span>

                    </div>

                    <div class="border-t border-gray-200 pt-3 text-[10px] text-gray-400">

                        <p>#${id.toString().slice(-4)} by <span class="font-bold text-gray-600">${issue.author || 'User'}</span></p>

                        <p>${issue.date || '1/15/2024'}</p>

                    </div>

                </div>

            </div>

        `;

        issuecontainer.appendChild(card);

    });

};



loadissue();