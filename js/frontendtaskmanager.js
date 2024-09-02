export const renderTaskmanager = () => {
  return `
  <button type="button" class="btn btn-info" id="logout">LOGOUT</button>
  <form id="frontendTaskmanager" class="middleDisplay">
  <div>
    <div class="card">
     
          <div class="container text-center">
  <div class="row">
    <div class="col">
        <div class="mb-3">
             <label for="taskName" class="form-label">Task Name</label>
            <input type="text" name="taskName" class="form-control" id="taskName" placeholder="task Name">
      </div>
    </div>
    <div class="col">
        <div class="mb-3">
             <label for="startDate" class="form-label">Start Date</label>
            <input type="text" name="startDate" class="form-control" id="startDate" placeholder="Start Date">
      </div>
    </div>
    <div class="col">
        <div class="mb-3">
             <label for="endDate" class="form-label">End Date</label>
            <input type="text" name="endDate" class="form-control" id="endDate" placeholder="End Date">
      </div>
    </div>
  </div>
</div>
</div>
      <button type="submit" class="btn btn-dark" style="width:100px; margin:10px;">SAVE</button>

  <ol class="list-group list-group-numbered" id="displayData">
 
  </ol>
      </div>
 
</form>`;
};
