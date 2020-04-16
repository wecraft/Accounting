<?php

namespace App\Console\Commands;

use App\Services\StatService;
use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(StatService $statService)
    {
        for ($i = 0; $i < 3; $i++) {
            $year = date('Y') - $i;
            $this->info($year);
            $this->info(print_r($statService->getYearlyTaxes($year), true));

        }
    }
}
