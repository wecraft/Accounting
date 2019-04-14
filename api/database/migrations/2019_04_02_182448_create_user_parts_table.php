<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_parts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->morphs('operation');
            $table->decimal('amount');
            $table->decimal('rate', 8, 5);
            $table->integer('type'); //-1 or 1
            $table->date('date');
            $table->boolean('tax');
            $table->boolean('vat');
            $table->integer('currency_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('currency_id')
                ->references('id')
                ->on('currencies')
                ->onDelete('set null');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_parts');
    }
}
