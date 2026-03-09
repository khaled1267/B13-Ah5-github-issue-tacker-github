let allIssues = [];

// API thaka data load korlam
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
            console.error("Fetch Error:", err);
            document.getElementById("total-issues").innerText = "Error Loading Data";
        });
};

// filter function set korlam

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


const searchIssues = () => {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filtered = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm)
    );
    updateTotalCount(filtered.length, 'Filtered');
    displayissue(filtered);
};

// সংখ্যা আপডেট korlam
const updateTotalCount = (count, label) => {
    const totalElement = document.getElementById("total-issues");
    if (totalElement) {
        totalElement.innerText = `${count} ${label === 'All' ? '' : label} Issues`;
    }
};


const showDetails = (issueId) => {
    const issue = allIssues.find(i => (i.id || i._id || i.title) == issueId);
    if (!issue) return;

    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <div class="p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">${issue.title}</h2>
            <div class="flex items-center gap-2 mb-6">
                <span class="bg-green-500 text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase">${issue.status}</span>
                <span class="text-gray-400 text-sm">• By ${issue.author || 'User'} • ${issue.date || '2026'}</span>
            </div>
            
            <p class="text-gray-600 text-sm mb-8 leading-relaxed">${issue.description}</p>
            
            <div class="bg-gray-50 rounded-xl p-6 grid grid-cols-2 gap-4">
                <div>
                    <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">Assignee</p>
                    <p class="text-sm font-bold text-gray-800">${issue.author || 'Unassigned'}</p>
                </div>
                <div>
                    <p class="text-[10px] text-gray-400 uppercase font-bold mb-1">Priority</p>
                    <span class="text-xs font-bold text-red-500 uppercase">${issue.priority || 'Normal'}</span>
                </div>
            </div>

            <div class="mt-8 flex justify-end">
                <button onclick="closeModal()" class="btn btn-primary px-10">Close</button>
            </div>
        </div>
    `;

    const modal = document.getElementById("issue-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => modalContent.classList.remove("scale-95"), 10);
};


const closeModal = () => {
    const modal = document.getElementById("issue-modal");
    const modalContent = document.getElementById("modal-content");
    modalContent.classList.add("scale-95");
    setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }, 200);
};

// কার্ড ডিসপ্লে korlam
const displayissue = (issues) => {
    const issuecontainer = document.getElementById("issue-container");
    issuecontainer.innerHTML = "";

    issues.forEach((issue) => {
        const id = issue.id || issue._id || issue.title;
        const card = document.createElement("div");
        card.className = "cursor-pointer group h-full";
        card.onclick = () => showDetails(id);

        card.innerHTML = `
            <div class="border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-t-green-500' : 'border-t-purple-500'} rounded-xl p-5 h-full flex flex-col justify-between bg-[#EFEFEF] hover:bg-white hover:shadow-xl transition-all duration-300">
                <div>
                    <div class="flex justify-between items-center mb-4">
                         <img src="${issue.status === 'open' ? './open-status.png' : './Closed- Status .png'}" class="w-8 h-8 rounded-full shadow-sm" onerror="this.src='https://cdn-icons-png.flaticon.com/512/6568/6568643.png'">
                        <span class="text-[10px] font-bold uppercase px-2 py-1 rounded border border-gray-300 bg-white">
                            ${issue.priority || 'Normal'}
                        </span>
                    </div>
                    <h3 class="font-bold text-gray-800   text-sm mb-2 group-hover:text-primary transition-colors">${issue.title}</h3>
                    <p class="text-xs text-gray-500 mb-4 line-clamp-3">${issue.description}</p>
                </div>
                <div class="border-t border-gray-200 pt-3 text-[10px] text-gray-400">
                    <p>#${id.toString().slice(-4)} by <span class="font-bold text-gray-600">${issue.author || 'User'}</span></p>
                </div>
            </div>
        `;
        issuecontainer.appendChild(card);
    });
};

loadissue();