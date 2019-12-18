// used for Unscheduled Tasks (ie new task creation)
export class UnscheduledTaskModel {
  constructor() {
    this._model = {
      AssessmentUnscheduleTaskId: null,
      ResidentId: null,
      AssessmentCategoryId: 14,
      AssessmentTaskId: null,
      AssessmentReasonId: 3,
      CompletedAssessmentShiftId: 4,
      AssessmentResolutionId: 6,
      AssessmentTaskStatusId: 4,
      AssessmentPriorityId: 0,
      UserId: "",
      EntryDate: new Date().toUTCString(),
      CompletedDate: "",
      FollowUpDate: "",
      SignedBy: "",
      InitialBy: "",
      Description: "", // task name
      Notes: "",
      IsCompleted: false,
      IsFinal: false,
      IsActive: true,
      CreatedDate: new Date().toUTCString(),
      CreatedBy: ""
    };
  }
  // sets userID
  setUser(id) {
    return (this._model.UserId = id);
  }
  // sets residentID
  setResident(id) {
    return (this._model.residentID = id);
  }
  setCategory(categoryID) {
    return (this._model.AssessmentCategoryId = categoryID);
  }
  setReason(reasonID) {
    return (this._model.AssessmentReasonId = reasonID);
  }
  setResolution(resolutionID) {
    return (this._model.AssessmentResolutionId = resolutionID);
  }
  setStatus(statusID) {
    return (this._model.AssessmentTaskStatusId = statusID);
  }
  setPriority(priorityID) {
    return (this._model.AssessmentPriorityId = priorityID);
  }
  setNotes(notes) {
    return (this._model.Notes = notes);
  }
  setEntryDate(entry = new Date()) {
    return (this._model.EntryDate = entry);
  }
  setFollowUp(followUp) {
    return (this._model.FollowUpDate = followUp);
  }
  setSignature(signature) {
    return (this._model.SignedBy = signature);
  }
  setIsCompleted(isCompleted = false) {
    return (this._model.IsCompleted = isCompleted);
  }
  setIsFinal(isFinal = false) {
    return (this._model.IsFinal = isFinal);
  }
  // populate model properties
  setModel(
    UserId = "",
    ResidentId = null,
    AssessmentCategoryId = 14,
    CompletedAssessmentShiftId = 4, // ALL
    AssessmentReasonId = 7, // NOT-COMPLETE
    AssessmentResolutionId = 6, // PENDING
    AssessmentStatusId = 4, // NOT-COMPLETE
    AssessmentPriorityID = 0, // NONE
    Notes = "",
    FollowUpDate = new Date(),
    SignedBy = "", // currentUser.FirstName if empty
    IsCompleted = false,
    IsFinal = false
  ) {
    this._model = {
      ...this._model,
      UserId: UserId,
      ResidentId: ResidentId,
      AssessmentCategoryId: AssessmentCategoryId,
      CompletedAssessmentShiftId: CompletedAssessmentShiftId,
      AssessmentReasonId: AssessmentReasonId,
      AssessmentResolutionId: AssessmentResolutionId,
      AssessmentStatusId: AssessmentStatusId,
      AssessmentPriorityID: AssessmentPriorityID,
      Notes: Notes,
      FollowUpDate: FollowUpDate,
      SignedBy: SignedBy,
      IsCompleted: IsCompleted,
      IsFinal: IsFinal
    };
  }
  isModelReady() {
    const empties = {
      count: 0,
      keys: []
    };
    const keys = Object.keys(this._model);
    keys.map((key, index) => {
      if (this._model[key] === null) {
        ++empties.count;
        return empties.keys.push(key);
      }
    });
    return empties;
  }
  // get variable model properties
  getModel() {
    return this._model;
  }
  // return any model name
  getModelProperty(prop) {
    return this._model[prop];
  }
}

export class CareTaskModel {
  constructor() {
    this._model = {
      ADLCategory: "",
      AdlId: "",
      AssessmentCategoryId: 4,
      AssessmentReasonId: null,
      AssessmentShiftId: 0,
      AssessmentTrackingId: null,
      CompletedAssessmentShiftId: null,
      CompletedDate: null,
      CompletedShift: null,
      DayOfWeek: "",
      FollowUpDate: null,
      InitialBy: null,
      IsCompleted: false,
      IsFinal: false,
      Points: 20,
      PointsAdl: 20,
      PointsBase: 20,
      PointsExtra: 0,
      Reason: null,
      ReasonForReassess: null,
      Resolution: null,
      Shift: "ALL",
      ShiftEndTime: null,
      ShiftManagerFirstName: null,
      ShiftManagerLastName: null,
      ShiftManagerUserId: null,
      ShiftStartTime: null,
      SignedBy: null,
      TaskDate: new Date(),
      TaskDescription: "",
      TaskName: "",
      TaskNotes: null,
      TaskStatus: null,
      TaskStatusNotes: null,
      TrackDate: new Date()
    };
  }
  getModel() {
    return this._model;
  }
}
