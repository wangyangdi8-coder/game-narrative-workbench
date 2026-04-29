const previewButtons = document.querySelectorAll("[data-preview]");
const previewViews = document.querySelectorAll("[data-view]");
const tabButtons = document.querySelectorAll("[data-tab]");
const dockPanels = document.querySelectorAll("[data-panel]");
const fields = document.querySelectorAll("[data-field]");
const sceneList = document.querySelector("#sceneList");
const sceneCount = document.querySelector("#sceneCount");
const sceneSearch = document.querySelector("#sceneSearch");
const addSceneTop = document.querySelector("#addSceneTop");
const deleteScene = document.querySelector("#deleteScene");
const duplicateScene = document.querySelector("#duplicateScene");
const pasteScene = document.querySelector("#pasteScene");
const editStatus = document.querySelector("#editStatus");
const saveHint = document.querySelector("#saveHint");
const importJson = document.querySelector("#importJson");
const exportJson = document.querySelector("#exportJson");
const exportMarkdown = document.querySelector("#exportMarkdown");
const importFile = document.querySelector("#importFile");
const exportDialog = document.querySelector("#exportDialog");
const closeExport = document.querySelector("#closeExport");
const exportTitle = document.querySelector("#exportTitle");
const exportContent = document.querySelector("#exportContent");
const exportMeta = document.querySelector("#exportMeta");
const downloadExport = document.querySelector("#downloadExport");
const deleteDialog = document.querySelector("#deleteDialog");
const deleteMessage = document.querySelector("#deleteMessage");
const cancelDelete = document.querySelector("#cancelDelete");
const confirmDelete = document.querySelector("#confirmDelete");
const emotionValue = document.querySelector("#emotionValue");

const previewLocation = document.querySelector("#previewLocation");
const previewBody = document.querySelector("#previewBody");
const previewCharacters = document.querySelector("#previewCharacters");
const previewKeyEvent = document.querySelector("#previewKeyEvent");
const previewGoal = document.querySelector("#previewGoal");
const designDetails = document.querySelector("#designDetails");
const routeMap = document.querySelector("#routeMap");
const routeStrip = document.querySelector("#routeStrip");
const mapDetailTitle = document.querySelector("#mapDetailTitle");
const routeNote = document.querySelector("#routeNote");
const linkedScenes = document.querySelector("#linkedScenes");
const emotionMetrics = document.querySelector("#emotionMetrics");
const emotionGraph = document.querySelector("#emotionGraph");
const emotionTitle = document.querySelector("#emotionTitle");
const emotionNote = document.querySelector("#emotionNote");
const emotionTags = document.querySelector("#emotionTags");
const summaryList = document.querySelector("#summaryList");
const storageKey = "narrative-tool-project-v1";

const routePositions = [
  ["12%", "58%"],
  ["30%", "34%"],
  ["48%", "66%"],
  ["64%", "44%"],
  ["78%", "22%"],
  ["88%", "70%"],
  ["22%", "76%"],
  ["56%", "24%"],
  ["72%", "62%"],
];

const emotionDefaults = {
  平静: 2,
  希望: 4,
  悬疑: 5,
  紧张: 6,
  压迫: 7,
  震惊: 7,
  恐惧: 8,
};

const defaultScenes = [
  {
    id: makeId(),
    title: "雨夜抵达",
    stage: "第一幕 · 引入",
    location: "旧码头",
    characters: "主角、渡船管理员、神秘少女",
    emotionType: "悬疑",
    emotionLevel: 5,
    playerGoal: "抵达雾港，找到接头人留下的第一条线索。",
    trigger: "玩家完成序章后，首次进入旧码头地图。",
    keyEvent: "玩家获得第一条警告线索。",
    body: "雨水打在铁皮棚顶，码头广播只剩下断续的电流声。渡船管理员递来一张被水浸湿的船票，背面写着：别相信第一个向你问路的人。",
    presentation: "镜头低角度跟随主角脚步，环境音加入远处汽笛。玩家获得任务提示：前往候船厅调查异常广播。",
  },
  {
    id: makeId(),
    title: "失踪名单",
    stage: "第二幕 · 调查",
    location: "警署档案室",
    characters: "主角、值班警员",
    emotionType: "紧张",
    emotionLevel: 6,
    playerGoal: "查找三年前的失踪人口档案。",
    trigger: "玩家进入警署并完成值班警员对话。",
    keyEvent: "失踪名单中出现主角父亲的名字。",
    body: "档案柜里的标签被人刻意撕掉，只有一页名单夹在最深处。纸张边缘焦黑，最后一行写着一个熟悉的姓氏。",
    presentation: "交互镜头聚焦档案页，背景音乐降低，只保留钟表声。",
  },
  {
    id: makeId(),
    title: "旅店断电",
    stage: "第三幕 · 危机",
    location: "黑松旅店",
    characters: "主角、旅店老板、走廊里的影子",
    emotionType: "恐惧",
    emotionLevel: 8,
    playerGoal: "在断电后找到备用电源。",
    trigger: "玩家阅读 203 房间的留言后。",
    keyEvent: "未知存在首次直接干扰玩家行动。",
    body: "走廊灯光一盏接一盏熄灭，门缝下的水迹开始倒流。旅店老板在楼下喊你的名字，但声音来自天花板。",
    presentation: "关闭大部分环境光，加入心跳音效与短暂输入延迟。",
  },
  {
    id: makeId(),
    title: "地下水道",
    stage: "第三幕 · 危机",
    location: "旧城区",
    characters: "主角、神秘少女",
    emotionType: "压迫",
    emotionLevel: 7,
    playerGoal: "跟随少女穿过封锁区域。",
    trigger: "玩家从旅店后门逃离。",
    keyEvent: "玩家发现雾港地下存在旧实验设施。",
    body: "水道尽头不是出口，而是一扇写着旧港研究站编号的铁门。少女没有解释，只把钥匙塞进你的手里。",
    presentation: "狭窄镜头、低频环境音、脚步回声随距离变化。",
  },
  {
    id: makeId(),
    title: "灯塔信号",
    stage: "终幕 · 揭露",
    location: "北岸灯塔",
    characters: "主角、神秘少女",
    emotionType: "希望",
    emotionLevel: 4,
    playerGoal: "重启灯塔并发送求援信号。",
    trigger: "玩家取得研究站钥匙后抵达北岸。",
    keyEvent: "短暂建立逃离可能性。",
    body: "灯塔的旧发报机还能工作。雾里第一次出现稳定的光束，海面传回一段断续回应。",
    presentation: "音乐转为较明亮的旋律，远景展示灯塔光束扫过海面。",
  },
  {
    id: makeId(),
    title: "真相靠岸",
    stage: "终幕 · 揭露",
    location: "废弃船坞",
    characters: "主角、神秘少女、失踪者",
    emotionType: "震惊",
    emotionLevel: 9,
    playerGoal: "进入船坞，确认求援信号的来源。",
    trigger: "灯塔收到回应后开放船坞区域。",
    keyEvent: "玩家发现所谓求援信号来自三年前。",
    body: "船坞里停着一艘早该沉没的渡船。甲板上的广播响起你的名字，声音和序章里的录音完全一致。",
    presentation: "长镜头进入船坞，广播声从左右声道交替出现，最后切入黑屏字幕。",
  },
];

const projectState = loadProject();
let scenes = projectState.scenes;
let activeId = scenes.some((scene) => scene.id === projectState.activeId)
  ? projectState.activeId
  : scenes[0].id;
let selectedLocation = scenes.find((scene) => scene.id === activeId)?.location ?? scenes[0].location;
let saveTimer = null;
let exportUrl = null;
let draggedSceneId = null;
let copiedScene = null;

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.preview;

    previewButtons.forEach((item) => item.classList.toggle("selected", item === button));
    previewViews.forEach((view) => {
      view.classList.toggle("hidden", view.dataset.view !== target);
    });
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => item.classList.toggle("selected", item === button));
    dockPanels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.panel !== target);
    });
  });
});

fields.forEach((field) => {
  const handleFieldChange = () => {
    const scene = getActiveScene();
    const value = field.type === "range" ? Number(field.value) : field.value;
    scene[field.dataset.field] = value;
    if (field.dataset.field === "location") {
      selectedLocation = value || "未设定地点";
    }
    if (field.dataset.field === "emotionType") {
      scene.emotionLevel = emotionDefaults[value] ?? scene.emotionLevel;
    }
    field.classList.toggle("invalid", field.dataset.required === "true" && !String(value).trim());
    markDirty();
    renderLive();
  };

  field.addEventListener("input", handleFieldChange);
  field.addEventListener("change", handleFieldChange);
});

sceneSearch.addEventListener("input", renderSceneList);
addSceneTop.addEventListener("click", addScene);
deleteScene.addEventListener("click", openDeleteDialog);
duplicateScene.addEventListener("click", copyActiveScene);
pasteScene.addEventListener("click", pasteCopiedScene);
saveHint.addEventListener("click", () => {
  if (validateActiveScene()) {
    saveProject();
  }
});
importJson.addEventListener("click", () => importFile.click());
exportJson.addEventListener("click", downloadJson);
exportMarkdown.addEventListener("click", downloadMarkdown);
importFile.addEventListener("change", handleImportFile);
closeExport.addEventListener("click", closeExportDialog);
exportDialog.addEventListener("click", (event) => {
  if (event.target === exportDialog) {
    closeExportDialog();
  }
});
cancelDelete.addEventListener("click", closeDeleteDialog);
confirmDelete.addEventListener("click", removeActiveScene);
deleteDialog.addEventListener("click", (event) => {
  if (event.target === deleteDialog) {
    closeDeleteDialog();
  }
});

function getActiveScene() {
  return scenes.find((scene) => scene.id === activeId) ?? scenes[0];
}

function markDirty() {
  editStatus.textContent = "有修改";
  editStatus.classList.add("dirty");
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveProject, 450);
}

function addScene() {
  const nextNumber = scenes.length + 1;
  const scene = {
    id: makeId(),
    title: `新场景 ${String(nextNumber).padStart(2, "0")}`,
    stage: "第一幕 · 引入",
    location: "未设定地点",
    characters: "主角",
    emotionType: "平静",
    emotionLevel: 3,
    playerGoal: "填写玩家在此场景中的目标。",
    trigger: "填写剧情触发条件。",
    keyEvent: "填写此场景推进剧情的关键事件。",
    body: "填写玩家会看到的剧情正文。",
    presentation: "填写镜头、音效、UI 提示或过场表现。",
  };

  scenes.push(scene);
  activeId = scene.id;
  selectedLocation = scene.location;
  sceneSearch.value = "";
  markDirty();
  render();
}

function openDeleteDialog() {
  if (scenes.length <= 1) {
    return;
  }

  const scene = getActiveScene();
  deleteMessage.textContent = `确定删除“${scene.title || "未命名场景"}”吗？这个操作会从当前项目中移除该场景。`;
  deleteDialog.classList.remove("hidden");
}

function closeDeleteDialog() {
  deleteDialog.classList.add("hidden");
}

function removeActiveScene() {
  const activeIndex = scenes.findIndex((scene) => scene.id === activeId);
  scenes = scenes.filter((scene) => scene.id !== activeId);
  activeId = scenes[Math.max(0, activeIndex - 1)].id;
  selectedLocation = getActiveScene().location;
  closeDeleteDialog();
  markDirty();
  render();
}

function copyActiveScene() {
  const scene = getActiveScene();
  copiedScene = { ...scene };
  pasteScene.disabled = false;
  editStatus.textContent = "已复制";
  editStatus.classList.remove("dirty");
}

function pasteCopiedScene() {
  if (!copiedScene) {
    return;
  }

  const activeIndex = scenes.findIndex((item) => item.id === activeId);
  const copy = {
    ...copiedScene,
    id: makeId(),
    title: `${copiedScene.title || "未命名场景"} 副本`,
  };

  scenes.splice(activeIndex + 1, 0, copy);
  activeId = copy.id;
  selectedLocation = copy.location;
  sceneSearch.value = "";
  markDirty();
  render();
}

function render() {
  renderForm();
  renderLive();
}

function renderLive() {
  const scene = getActiveScene();
  emotionValue.textContent = scene.emotionLevel;
  renderSceneList();
  renderPreview();
  renderMap();
  renderEmotionChart();
  renderSummary();
}

function renderForm() {
  const scene = getActiveScene();

  fields.forEach((field) => {
    const value = scene[field.dataset.field];
    field.value = value ?? "";
  });

  emotionValue.textContent = scene.emotionLevel;
  deleteScene.disabled = scenes.length <= 1;
}

function renderSceneList() {
  const query = sceneSearch.value.trim().toLowerCase();
  const filtered = scenes.filter((scene) => {
    const searchable = [scene.title, scene.location, scene.characters, scene.emotionType]
      .join(" ")
      .toLowerCase();
    return searchable.includes(query);
  });

  sceneCount.textContent = scenes.length;
  sceneList.innerHTML = "";

  filtered.forEach((scene) => {
    const index = scenes.findIndex((item) => item.id === scene.id) + 1;
    const button = document.createElement("button");
    button.className = `scene-card${scene.id === activeId ? " active" : ""}`;
    button.draggable = true;
    button.dataset.sceneId = scene.id;
    button.innerHTML = `
      <span class="scene-index">${String(index).padStart(2, "0")}</span>
      <span class="scene-main">
        <strong>${escapeHtml(scene.title || "未命名场景")}</strong>
        <small>${escapeHtml(scene.location || "未设定地点")} · ${escapeHtml(scene.emotionType)} ${scene.emotionLevel}</small>
      </span>
    `;
    button.addEventListener("click", () => {
      activeId = scene.id;
      selectedLocation = scene.location;
      render();
    });
    button.addEventListener("dragstart", (event) => {
      draggedSceneId = scene.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", scene.id);
      button.classList.add("dragging");
    });
    button.addEventListener("dragend", () => {
      draggedSceneId = null;
      button.classList.remove("dragging");
      document.querySelectorAll(".scene-card.drop-target").forEach((card) => {
        card.classList.remove("drop-target");
      });
    });
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (scene.id !== draggedSceneId) {
        button.classList.add("drop-target");
      }
    });
    button.addEventListener("dragleave", () => {
      button.classList.remove("drop-target");
    });
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      button.classList.remove("drop-target");
      reorderScene(draggedSceneId, scene.id);
    });
    sceneList.append(button);
  });

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "没有匹配的场景";
    sceneList.append(empty);
  }
}

function reorderScene(sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) {
    return;
  }

  const sourceIndex = scenes.findIndex((scene) => scene.id === sourceId);
  const targetIndex = scenes.findIndex((scene) => scene.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0) {
    return;
  }

  const [movedScene] = scenes.splice(sourceIndex, 1);
  scenes.splice(targetIndex, 0, movedScene);
  activeId = sourceId;
  selectedLocation = movedScene.location;
  markDirty();
  render();
}

function renderPreview() {
  const scene = getActiveScene();

  previewLocation.textContent = `${scene.location || "未设定地点"} · ${scene.emotionType}`;
  previewBody.textContent = scene.body || "暂无剧情正文。";
  previewCharacters.textContent = scene.characters || "未设定角色";
  previewKeyEvent.textContent = scene.keyEvent || "暂无关键事件。";
  previewGoal.textContent = scene.playerGoal || "暂无玩家目标。";

  const detailItems = [
    ["触发条件", scene.trigger],
    ["关键事件", scene.keyEvent],
    ["表现方式", scene.presentation],
    ["情绪定位", `${scene.emotionType} · 强度 ${scene.emotionLevel}`],
  ];

  designDetails.innerHTML = detailItems
    .map(
      ([term, description]) => `
        <div>
          <dt>${term}</dt>
          <dd>${escapeHtml(description || "未填写")}</dd>
        </div>
      `,
    )
    .join("");
}

function renderMap() {
  const locations = getLocations();
  const activeScene = getActiveScene();
  selectedLocation = selectedLocation || activeScene.location;

  routeMap.innerHTML = "";
  routeStrip.innerHTML = "";

  locations.forEach((locationItem, index) => {
    const x = locations.length === 1 ? "50%" : `${10 + (index / (locations.length - 1)) * 80}%`;
    const y = "50%";
    const node = document.createElement("button");
    const isActive = locationItem.name === activeScene.location;
    const isSelected = locationItem.name === selectedLocation;
    const relatedScene = locationItem.scenes[0];
    node.className = `map-node${isActive ? " current" : ""}${isSelected ? " selected" : ""}${index === locations.length - 1 ? " danger" : ""}`;
    node.style.setProperty("--x", x);
    node.style.setProperty("--y", y);
    node.innerHTML = `${escapeHtml(locationItem.name)}<small>${locationItem.scenes.length}</small>`;
    node.addEventListener("click", () => {
      selectedLocation = locationItem.name;
      activeId = relatedScene.id;
      render();
    });
    routeMap.append(node);

    const routeItem = document.createElement("button");
    routeItem.className = `route-step${isActive ? " current" : ""}${isSelected ? " selected" : ""}`;
    routeItem.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(locationItem.name)}</strong>
    `;
    routeItem.addEventListener("click", () => {
      selectedLocation = locationItem.name;
      activeId = relatedScene.id;
      render();
    });
    routeStrip.append(routeItem);
  });

  const selected = locations.find((location) => location.name === selectedLocation) ?? locations[0];
  mapDetailTitle.textContent = selected.name;
  routeNote.textContent = `当前场景位于 ${activeScene.location || "未设定地点"}。所选地点关联 ${selected.scenes.length} 个剧情场景，路线共经过 ${locations.length} 个地点。`;
  linkedScenes.innerHTML = selected.scenes
    .map(
      (scene) => `
        <button class="${scene.id === activeId ? "active" : ""}" data-scene-id="${scene.id}">
          <strong>${escapeHtml(scene.title || "未命名场景")}</strong>
          <span>${escapeHtml(scene.playerGoal || "暂无玩家目标")}</span>
        </button>
      `,
    )
    .join("");

  linkedScenes.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.sceneId;
      selectedLocation = getActiveScene().location;
      render();
    });
  });
}

function renderEmotionChart() {
  const activeScene = getActiveScene();
  const levels = scenes.map((scene) => Number(scene.emotionLevel) || 1);
  const maxLevel = Math.max(...levels);
  const minLevel = Math.min(...levels);
  const averageLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length;
  const peakScene = scenes.find((scene) => Number(scene.emotionLevel) === maxLevel);
  const lowScene = scenes.find((scene) => Number(scene.emotionLevel) === minLevel);
  const activeIndex = scenes.findIndex((scene) => scene.id === activeId);
  const previousLevel = activeIndex > 0 ? Number(scenes[activeIndex - 1].emotionLevel) || 1 : null;
  const activeLevel = Number(activeScene.emotionLevel) || 1;
  const delta = previousLevel === null ? 0 : activeLevel - previousLevel;

  renderEmotionLine(maxLevel);
  emotionMetrics.innerHTML = `
    <div>
      <span>最高点：</span>
      <strong>${maxLevel}</strong>
      <small>${escapeHtml(peakScene?.title ?? "无")}</small>
    </div>
    <div>
      <span>最低点：</span>
      <strong>${minLevel}</strong>
      <small>${escapeHtml(lowScene?.title ?? "无")}</small>
    </div>
    <div>
      <span>平均强度：</span>
      <strong>${averageLevel.toFixed(1)}</strong>
      <small>${getPacingLabel(averageLevel)}</small>
    </div>
  `;

  emotionTitle.textContent = `${activeScene.title || "当前场景"} · ${activeScene.emotionType}`;
  emotionNote.textContent = `当前情绪强度为 ${activeScene.emotionLevel}，相对上一场景${formatDelta(delta)}。${getScenePacingAdvice(activeLevel, delta)}`;
  emotionTags.innerHTML = scenes
    .map(
      (scene) => `
        <button class="${scene.id === activeId ? "active" : ""}" data-scene-id="${scene.id}">
          ${escapeHtml(scene.emotionType)} ${scene.emotionLevel}
        </button>
      `,
    )
    .join("");

  emotionTags.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.sceneId;
      selectedLocation = getActiveScene().location;
      render();
    });
  });
}

function renderSummary() {
  summaryList.innerHTML = scenes
    .map(
      (scene, index) => `
        <li class="${scene.id === activeId ? "active" : ""}">
          <strong>${String(index + 1).padStart(2, "0")} ${escapeHtml(scene.title || "未命名场景")}</strong>
          <span>${escapeHtml(scene.keyEvent || scene.playerGoal || "暂无摘要")}</span>
        </li>
      `,
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveProject() {
  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    scenes,
    activeId,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(payload));
    editStatus.textContent = "已保存";
    editStatus.classList.remove("dirty");
  } catch {
    editStatus.textContent = "保存失败";
    editStatus.classList.add("dirty");
  }
}

function validateActiveScene() {
  const missingFields = [...fields].filter((field) => {
    return field.dataset.required === "true" && !String(field.value).trim();
  });

  fields.forEach((field) => {
    field.classList.toggle("invalid", missingFields.includes(field));
  });

  if (missingFields.length) {
    editStatus.textContent = `缺少 ${missingFields.length} 项`;
    editStatus.classList.add("dirty");
    missingFields[0].focus();
    return false;
  }

  return true;
}

function loadProject() {
  const fallback = cloneScenes(defaultScenes);
  const fallbackState = { scenes: fallback, activeId: fallback[0].id };
  let raw = null;

  try {
    raw = localStorage.getItem(storageKey);
  } catch {
    return fallbackState;
  }

  if (!raw) {
    return fallbackState;
  }

  try {
    const parsed = JSON.parse(raw);
    const loadedScenes = Array.isArray(parsed.scenes) ? parsed.scenes : parsed;
    const normalized = normalizeScenes(loadedScenes);
    return normalized.length
      ? { scenes: normalized, activeId: parsed.activeId }
      : fallbackState;
  } catch {
    return fallbackState;
  }
}

function cloneScenes(inputScenes) {
  return inputScenes.map((scene) => ({ ...scene }));
}

function normalizeScenes(inputScenes) {
  return inputScenes
    .filter((scene) => scene && typeof scene === "object")
    .map((scene, index) => ({
      id: scene.id || makeId(),
      title: scene.title || `未命名场景 ${index + 1}`,
      stage: scene.stage || "第一幕 · 引入",
      location: scene.location || "未设定地点",
      characters: scene.characters || "主角",
      emotionType: scene.emotionType || "平静",
      emotionLevel: Number(scene.emotionLevel) || emotionDefaults[scene.emotionType] || 3,
      playerGoal: scene.playerGoal || "",
      trigger: scene.trigger || "",
      keyEvent: scene.keyEvent || "",
      body: scene.body || "",
      presentation: scene.presentation || "",
    }));
}

function handleImportFile(event) {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const importedScenes = Array.isArray(parsed.scenes) ? parsed.scenes : parsed;
      const normalized = normalizeScenes(importedScenes);

      if (!normalized.length) {
        throw new Error("empty project");
      }

      scenes = normalized;
      activeId = scenes[0].id;
      selectedLocation = scenes[0].location;
      saveProject();
      sceneSearch.value = "";
      render();
    } catch {
      editStatus.textContent = "导入失败";
      editStatus.classList.add("dirty");
    } finally {
      importFile.value = "";
    }
  });
  reader.readAsText(file);
}

function downloadJson() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    scenes,
  };

  showExportDialog({
    title: "导出 JSON",
    filename: "narrative-project.json",
    content: JSON.stringify(payload, null, 2),
    type: "application/json",
  });
}

function downloadMarkdown() {
  const markdown = [
    "# 剧情项目",
    "",
    ...scenes.flatMap((scene, index) => [
      `## ${index + 1}. ${scene.title || "未命名场景"}`,
      "",
      `- 剧情阶段：${scene.stage || "未填写"}`,
      `- 地点：${scene.location || "未填写"}`,
      `- 登场角色：${scene.characters || "未填写"}`,
      `- 玩家目标：${scene.playerGoal || "未填写"}`,
      `- 触发条件：${scene.trigger || "未填写"}`,
      `- 情绪：${scene.emotionType || "未填写"} ${scene.emotionLevel || ""}`,
      `- 关键事件：${scene.keyEvent || "未填写"}`,
      "",
      "### 剧情正文",
      "",
      scene.body || "未填写",
      "",
      "### 系统表现",
      "",
      scene.presentation || "未填写",
      "",
    ]),
  ].join("\n");

  showExportDialog({
    title: "导出 Markdown",
    filename: "narrative-project.md",
    content: markdown,
    type: "text/markdown;charset=utf-8",
  });
}

function showExportDialog({ title, filename, content, type }) {
  if (exportUrl) {
    URL.revokeObjectURL(exportUrl);
  }

  const blob = new Blob([content], { type });
  exportUrl = URL.createObjectURL(blob);
  exportTitle.textContent = title;
  exportContent.value = content;
  exportMeta.textContent = `${filename} · ${(blob.size / 1024).toFixed(1)} KB`;
  downloadExport.href = exportUrl;
  downloadExport.download = filename;
  exportDialog.classList.remove("hidden");
  exportContent.focus();
  exportContent.select();
}

function closeExportDialog() {
  exportDialog.classList.add("hidden");
  exportContent.value = "";
}

function getLocations() {
  const locationMap = new Map();

  scenes.forEach((scene) => {
    const name = scene.location || "未设定地点";
    if (!locationMap.has(name)) {
      locationMap.set(name, []);
    }
    locationMap.get(name).push(scene);
  });

  return [...locationMap.entries()].map(([name, relatedScenes]) => ({
    name,
    scenes: relatedScenes,
  }));
}

function renderEmotionLine(maxLevel) {
  const width = 100;
  const height = 100;
  const points = scenes.map((scene, index) => {
    const x = scenes.length === 1 ? 50 : (index / (scenes.length - 1)) * width;
    const level = Number(scene.emotionLevel) || 1;
    const y = height - (level / 10) * 82 - 8;
    return { x, y, scene, level };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

  emotionGraph.innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="92" x2="100" y2="92" />
      <line x1="0" y1="50" x2="100" y2="50" />
      <line x1="0" y1="10" x2="100" y2="10" />
      <polyline points="${polyline}" />
    </svg>
    <div class="emotion-points">
      ${points
        .map(
          (point) => `
            <button
              class="${point.scene.id === activeId ? "active" : ""}${point.level === maxLevel ? " peak" : ""}"
              style="--x:${point.x}%; --y:${point.y}%"
              data-scene-id="${point.scene.id}"
              title="${escapeHtml(point.scene.title)} · ${escapeHtml(point.scene.emotionType)} ${point.level}"
            >
              <span>${point.level}</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;

  emotionGraph.querySelectorAll("[data-scene-id]").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.sceneId;
      selectedLocation = getActiveScene().location;
      render();
    });
  });
}

function formatDelta(delta) {
  if (delta > 0) {
    return `上升 ${delta}`;
  }
  if (delta < 0) {
    return `下降 ${Math.abs(delta)}`;
  }
  return "持平";
}

function getPacingLabel(value) {
  if (value >= 7) {
    return "整体高压";
  }
  if (value >= 4.5) {
    return "张弛适中";
  }
  return "整体偏缓";
}

function getScenePacingAdvice(level, delta) {
  if (level >= 8) {
    return "这是强节奏节点，适合承载危机、揭露或强冲突。";
  }
  if (delta >= 3) {
    return "这里出现明显升压，可以作为转折或危险逼近。";
  }
  if (delta <= -3) {
    return "这里有明显缓和，适合给玩家整理线索或建立情感连接。";
  }
  if (level <= 3) {
    return "这是低压段，可以用于探索、铺垫或信息沉淀。";
  }
  return "当前节奏稳定，适合推进调查和目标执行。";
}

function makeId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `scene-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

render();
