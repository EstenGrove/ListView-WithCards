const endpoints = {
  base: "https://apitest.aladvantage.com/alaservices/v1/",
  auth: {
    login: "Security/Login",
    logout: "Security/Logout",
    loginStatus: "Security/LoginValid"
  },
  generic: {
    count: "Data/Count",
    get: "Data/Get",
    get2: "Data/Get2",
    delete: "Data/Delete",
    execute: "Data/Execute",
    insert: "Data/Insert",
    save: "Data/Save",
    update: "Data/Update"
  },
  uploads: {
    upload: "Upload/PutFile",
    uploadMany: "Upload/PutFileMany",
    saveFileRegistry: "Upload/SaveFileRegistry",
    saveFileRegistryMany: "Upload/SaveFileRegistryMany"
  },
  downloads: {
    getFile: "Download/GetFile",
    getFileMany: "Download/GetFileMany",
    getFileRegistry: {
      byUser: "Download/GetFileRegistryByUser",
      byResident: "Download/GetFileRegistryByResident",
      byFacility: "Download/GetFileRegistryByFacility",
      byMeta: "Download/GetFileRegistryByMeta"
    }
  },
  residents: {
    getResidents: "Advantage/GetResidents",
    getProfile: "Resident/GetResidentProfile",
    byUser: "Resident/GetResidentsByUser",
    byUserEmail: "Resident/GetResidentsByUserEmail",
    getAssessment: "Resident/GetResidentAssessment",
    forTracker: "Resident/GetResidentForAdvantageTracker",
    byFacility: "Resident/GetResidentsByFacility",
    getSummary: "Advantage/GetSummary",
    photos: "Advantage/GetResidentPhotos"
  },
  tasks: {
    get: {
      task: "Advantage/GetAssessmentTrackingTask",
      task2: "Advantage/GetAssessmentTrackingTask2"
    },
    update: {
      task: "Advantage/UpdateAssessmentTrackingTask",
      taskMany: "Advantage/UpdateAssessmentTrackingTaskMany"
    },
    save: {
      task: "Advantage/SaveAssessmentTrackingTask",
      taskMany: "Advantage/SaveAssessmentTrackingTaskMany"
    },
    insert: {
      task: "Advantage/InsertAssessmentTrackingTask",
      taskMany: "Advantage/InsertAssessmentTrackingTaskMany"
    },
    remove: {
      task: "Advantage/DeleteAssessmentTrackingTask",
      taskMany: "Advantage/DeleteAssessmentTrackingTaskMany"
    },
    count: {
      task: "Advantage/CountAssessmentTrackingTask",
      task2: "Advantage/CountAssessmentTrackingTask2"
    },
    status: {
      task: "Advantage/UpdateAssessmentTaskStatus",
      taskMany: "Advantage/UpdateAssessmentTaskStatusMany"
    },
    unscheduled: {
      task: "Advantage/SaveAssessmentUnscheduleTask",
      taskMany: "Advantage/SaveAssessmentUnscheduleTaskMany",
      get: "Advantage/GetAssessmentUnscheduleTask",
      updateTask: "Advantage/UpdateAssessmentUnscheduleTask",
      updateTaskMany: "Advantage/UpdateAssessmentUnscheduleTaskMany"
    }
  },
  tracking: {
    save: "Advantage/SaveAssessmentTracking",
    update: "Advantage/UpdateAssessmentTracking"
  },
  reassess: {
    updateSingle: "Advantage/UpdateAssessmentTrackingReassess",
    updateMany: "Advantage/UpdateAssessmentTrackingReassessMany"
  },
  user: {
    getProfile: "Security/GetUserProfile",
    getProfileByEmail: "Security/GetUserProfileByEmail"
  },
  reports: {
    getInfo: "Reports/GetReportInformation",
    executeReport: "Reports/ExecuteReport"
  }
};

const {
  auth,
  generic,
  uploads,
  downloads,
  downloads: { getFileRegistry },
  residents,
  tasks,
  tasks: { get, save, update, insert, remove, count, status, unscheduled },
  tracking,
  reassess,
  user
} = endpoints;

export {
  auth,
  generic,
  uploads,
  downloads,
  getFileRegistry,
  residents,
  tasks,
  get,
  save,
  update,
  insert,
  remove,
  count,
  status,
  unscheduled,
  tracking,
  reassess,
  user
};
