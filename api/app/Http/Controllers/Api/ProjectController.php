<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Resource;
use App\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->in_progress) {
            $data = Project::orderBy('id', 'desc')->where('status', 'progress')->get();
        } else {
            $chunk = min($request->get('chunk', 100), 500);

            $data = Project::orderBy('id', 'desc')->simplePaginate($chunk);
        }


        return Resource::collection($data, $request->include);
    }

    public function count()
    {

        $count = Project::count();

        return response()->json(['data' => $count]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $project = Project::where('id', $id)->firstOrFail();

        return new Resource($project, $request->include);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectService $projectService, $id)
    {
        $data = $request->all();
        $data['pies'][0]['amount'] = $data['pies'][0]['amount'] / 100;
        $data['pies'][1]['amount'] = $data['pies'][1]['amount'] / 100;


        $project = Project::where('id', $id)->firstOrFail();

        $projectService->update($project, $data);

        return new Resource($project, $request->include);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
